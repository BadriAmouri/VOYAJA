import { Box, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import Table from "../Components/Table";

const ordersColumns = [
  { accessorKey: "id", header: "Order ID" },
  { accessorKey: "order_date", header: "Date" },
  { accessorKey: "customer_name", header: "Customer Name" },
  { accessorKey: "phone_number", header: "Phone Number" },
  {
    accessorKey: "status",
    header: "Status",
    Cell: ({ row }) => (
      <span className={`status ${row.original.status}`}>
        {row.original.status}
      </span>
    ),
  },
  { accessorKey: "amount", header: "Amount" },
];

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("/api/booking/get/3");
        if (!response.ok) throw new Error("Failed to fetch orders");
        const ordersList = await response.json();
        console.log("the orderList are : ", ordersList)

        const updatedOrders = ordersList.map((offer, index) => ({
          id: index + 1,
          customer_name: `${offer?.customer_name || ""} ${
            offer?.customer_surname || ""
          }`.trim(),
          order_date: offer?.starting_date || "No Date",
          client_id : offer?.customer_id || "No ID",
          offer_id : offer?.offer_id || "No ID",
          phone_number: offer?.customer_phone || "N/A",
          amount: offer?.total_price || "Not Available",
          status: offer?.status ? "Confirmed" : "Pending",
        }));

        setOrders(updatedOrders);
        console.log("the updatedOrders are : ", orders)
      } catch (error) {
        setError("Failed to load orders");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <Box sx={{ pt: "80px", pb: "20px" }}>
      <Typography variant="h6" sx={{ marginBottom: "14px" }}>
        Orders
      </Typography>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Table
          data={orders}
          fields={ordersColumns}
          numberOfRows={orders.length}
          enableTopToolBar
          enableBottomToolBar
          enablePagination
          enableRowSelection
          enableColumnFilters
          enableEditing
          enableColumnDragging
          showPreview
          routeLink="orders"
        />
      )}
    </Box>
  );
};

export default Orders;
