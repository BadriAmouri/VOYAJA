import { Box, Chip, Grid, Paper, Rating, Typography } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { products } from "../data/products";

const SingleProduct = () => {
  // get the id from the route link
  const { id } = useParams();
  const product = products.find((product) => product.id === parseInt(id));

  const {  image, Offer_place, instock, Destination_City, Depart_City, Number_Of_Days ,price } =
    product;

  return (
    <Box sx={{ pt: "80px", pb: "20px" }}>
      <Typography variant="h4">Offer Details</Typography>
      <Paper
        sx={{
          boxShadow: "none !important",
          borderRadius: "12px",
          borderStyle: "solid",
          borderWidth: "1px",
          borderColor: "divider",
          p: "20px",
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <img
              src={image}
              alt={Offer_place}
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </Grid>
          
          <Grid item xs={12} md={6} lg={8}>
            <Typography variant="h4">{Offer_place}</Typography>
            <Typography variant="h5">
              <span
                style={{
                  opacity: 0.7,
                  textDecoration: "line-through",
                  fontSize: "13px",
                }}
              >
                $1829
              </span>{" "}
              ${price}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 4, my: 2 }}>
              <Typography variant="subtitle2">284 customer reviews</Typography>
              <Rating
                value={Number((Math.random() * 5).toFixed(2))}
                precision={0.5}
                readOnly
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 4, my: 2 }}>
              <Typography variant="subtitle2">Departure City :</Typography>
              <Typography variant="subtitle2">{Depart_City}</Typography>

              
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 4, my: 2 }}>
              <Typography variant="subtitle2">Arrival City :</Typography>
              <Typography variant="subtitle2">{Destination_City}</Typography>

              
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 4, my: 2 }}>
              <Typography variant="subtitle2">Number Of Days :</Typography>
              <Typography variant="subtitle2">{Number_Of_Days}</Typography>

              
            </Box>
            <Typography variant="subtitle2">Options</Typography>
            <Typography variant="subtitle2">Regulations</Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 4, my: 2 }}>
              <Typography variant="subtitle2">Availability</Typography>
              <Chip
                label={instock ? "In stock" : "Out Of Stock"}
                color={instock ? "success" : "error"}
              />
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default SingleProduct;
