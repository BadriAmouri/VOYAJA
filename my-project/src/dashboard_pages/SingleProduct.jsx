// SingleProduct.jsx
import { Box, Chip, Grid, Paper, Rating, Typography } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { useProducts } from "../contexts/ProductsContext";

const SingleProduct = () => {
  const { id } = useParams();
  const { updatedProducts } = useProducts();

  // Find the product by id
  const product = updatedProducts.find((product) => product.id === parseInt(id));

  if (!product) {
    return <Typography>Product not found</Typography>;
  }

  const {
    image,
    offer_name,
    starting_date,
    offer_depart,
    offer_dest,
    duration,
    instock,
    min_price,
  } = product;

  return (
    <Box sx={{ pt: "80px", pb: "20px" }}>
      <Typography variant="h4">Offer Details</Typography>
      <Paper sx={{ p: "20px", borderRadius: "12px", boxShadow: "none" }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <img src={image} alt={offer_name} style={{ width: "100%", objectFit: "contain" }} />
          </Grid>
          <Grid item xs={12} md={6} lg={8}>
            <Typography variant="h4">{offer_name}</Typography>
            <Typography variant="h5">
              <span style={{ textDecoration: "line-through", fontSize: "13px", opacity: 0.7 }}>
                $1229
              </span>{" "}
              ${min_price}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 4, my: 2 }}>
              <Typography variant="subtitle2">284 customer reviews</Typography>
              <Rating value={Math.random() * 5} precision={0.5} readOnly />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 4, my: 2 }}>
              <Typography variant="subtitle2">Departure City:</Typography>
              <Typography variant="subtitle2">{offer_depart}</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 4, my: 2 }}>
              <Typography variant="subtitle2">Arrival City:</Typography>
              <Typography variant="subtitle2">{offer_dest}</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 4, my: 2 }}>
              <Typography variant="subtitle2">Number of Days:</Typography>
              <Typography variant="subtitle2">{duration}</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 4, my: 2 }}>
              <Typography variant="subtitle2">Availability:</Typography>
              <Chip label={instock ? "Still Available" : "Not Available"} color={instock ? "success" : "error"} />
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default SingleProduct;
