/* eslint-disable no-restricted-globals */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useMemo, useState , useEffect } from "react";
import MaterialReactTable from "material-react-table";
import { Button, IconButton, Tooltip } from "@mui/material";
import { FiEye, FiTrash } from "react-icons/fi";
import { GiMedallist } from "react-icons/gi";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";

export const Table = ({
  data,
  fields,
  numberOfRows,
  enableTopToolBar,
  enableBottomToolBar,
  enablePagination,
  enableRowSelection,
  enableColumnFilters,
  enableEditing,
  enableColumnDragging,
  showPreview,
  routeLink,
  seeOrders 
}) => {
  const columns = useMemo(() => fields, []);

  const [tableData, setTableData] = useState(() => data);

  useEffect(() => {
    // Sync table data with the prop data whenever it changes
    setTableData(data);
  }, [data]);

  const handleDeleteRow = useCallback(
    (row) => {
      if (!confirm("Are you sure you want to delete")) {
        return;
      }
      data.splice(row.index, 1);
      setTableData([...tableData]);
    },
    [tableData]
  );

  return (
    <MaterialReactTable
      columns={columns}
      data={tableData.slice(0, numberOfRows)}
      getRowId={(row) => row.id}
      enableEditing={enableEditing}
      enableColumnDragging={enableColumnDragging}
      enableColumnOrdering
      enableRowSelection={enableRowSelection}
      enableColumnFilters={enableColumnFilters}
      enablePagination={enablePagination}
      enableBottomToolbar={enableBottomToolBar}
      enableTopToolbar={enableTopToolBar}
      renderRowActions={({ row }) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Tooltip arrow placement="right" title="Delete">
            <IconButton color="error" onClick={() => handleDeleteRow(row)}>
              <FiTrash />
            </IconButton>
          </Tooltip>
          {showPreview && routeLink && (
            <Tooltip arrow placement="right" title="View">
              <Link to={`/Dashboard/${routeLink}/${row.id}`}>
                <IconButton>
                  <FiEye />
                </IconButton>
              </Link>
            </Tooltip>
          )}
          { seeOrders && ( 
           <Tooltip arrow placement="right" title="See Orders">
           <Link to={`/Dashboard/orders`}>
            <IconButton color="yellow" >
            <GiMedallist />
            </IconButton>
            </Link>
          </Tooltip>
          )}
        </Box>
          
      )}
      renderTopToolbarCustomActions={({ table }) => (
        <Button
          disableElevation
          color="error"
          // disabled={!table.getIsSomeRowsSelected()}
          variant="contained"
          // onClick={handleDelete}
        >
          Delete Selected
        </Button>
      )}
      muiTableBodyRowProps={{ hover: false }}
      muiTablePaperProps={{
        sx: {
          padding: "20px",
          borderRadius: "15px",
          borderStyle: "solid",
          borderWidth: "1px",
          borderColor: "divider",
        },
      }}
      muiTableContainerProps={{
        sx: { borderRadius: "15px" },
      }}
      muiTableHeadCellProps={{
        sx: {
          fontSize: "14px",
          fontWeight: "bold",
        },
      }}
      muiTableHeadProps={{
        sx: {
          "& tr th": {
            borderWidth: "1px",
            borderColor: "divider",
            borderStyle: "solid",
          },
        },
      }}
      muiTableBodyProps={{
        sx: {
          "& tr td": {
            borderWidth: "1px",
            borderColor: "divider",
            borderStyle: "solid",
          },
        },
      }}
    />
  );
};

export default Table;
