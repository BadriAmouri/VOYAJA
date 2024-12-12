// Products.jsx
import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import Table from "../Components/Table";
import { productsColumns } from "../data/products";
import { useProducts } from "../contexts/ProductsContext";

const Products = () => {
  const { updatedProducts, setUpdatedProducts } = useProducts();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await fetch("/api/offers");
        const offers = await response.json();

        const updatedProducts = offers.map((offer, index) => ({
          id: index + 1,
          offer_name: offer?.offer_name || "No Offer",
          starting_date: offer?.starting_date || "No Date",
          offer_depart: offer?.offer_depart || "Not Available",
          offer_dest: offer?.offer_dest || "Not Available",
          duration: offer?.duration || "Unknown",
          min_price: offer?.min_price || "N/A",
          image: offer?.pictures_urls?.[0] || "default_image_url",
          instock: !offer?.history_offer || false,
        }));

        setUpdatedProducts(updatedProducts);
      } catch (error) {
        console.error("Error fetching offers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, [setUpdatedProducts]);

  return (
    <Box sx={{ pt: "80px", pb: "20px" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
        <Typography variant="h6">Offers</Typography>
        <Link to="/Dashboard/products/add">
          <Button variant="contained" color="primary" startIcon={<FiPlus />}>
            Add Offer
          </Button>
        </Link>
      </Box>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        
      <Table
          key={updatedProducts.length}  // Trigger re-render by changing key
          data={updatedProducts}
          fields={productsColumns}
          numberOfRows={updatedProducts.length}
          enableTopToolBar={true}
          enableBottomToolBar={true}
          enablePagination={true}
          enableRowSelection={true}
          enableColumnFilters={true}
          enableEditing={true}
          enableColumnDragging={true}
          showPreview={true}
          seeOrders={true}
          routeLink="products"
        />
      )}
    </Box>
  );
};

export default Products;
