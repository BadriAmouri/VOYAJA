import styled from "@emotion/styled";
import { Box, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import BarChart from "../Components/Home/charts/BarChart";
import Stats from "../Components/Home/stats/Stats";
import TransactionCustomer from "../Components/Home/TransactionCustomer";
import Table from "../Components/Table";
import { orders, ordersColumns } from "../data/orders";

const Dashboard = () => {
  const ComponentWrapper = styled(Box)({
    marginTop: "10px",
    paddingBottom: "10px",
  });

  return (
    <Box sx={{ pt: "80px", pb: "20px" }}>
      <Typography variant="h6" sx={{ marginBottom: "14px" }}>
        Dashboard
      </Typography>
      <ComponentWrapper>
        <Stats />
      </ComponentWrapper>
{/*    sales statistics  */ }
      <ComponentWrapper>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={8}>
            <BarChart />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
          <ComponentWrapper>
        <TransactionCustomer />
      </ComponentWrapper>
          </Grid>
        </Grid>
      </ComponentWrapper>
      

      <ComponentWrapper>
        <Typography variant="h5" sx={{ my: 3 }}>
          Latest Orders
        </Typography>
        <Table
          data={orders}
          fields={ordersColumns}
          numberOfRows={5}
          enableTopToolBar={false}
          enableBottomToolBar={false}
          enablePagination={false}
          enableRowSelection={false}
          enableColumnFilters={false}
          enableEditing={false}
          enableColumnDragging={false}
        />
      </ComponentWrapper>
    </Box>
  );
};

export default Dashboard;
