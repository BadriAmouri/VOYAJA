// Products.jsx
import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import Table from "../Components/Table";
import { useProducts } from "../contexts/ProductsContext";
import axios from "axios";
import { useAppContext } from "../contexts/AppContext";

const productsColumns = [
  {
    accessorKey: "offer_name", //access nested data with dot notation
    header: "offer_name",
  },
  {
    accessorKey: "starting_date", //access nested data with dot notation
    header: "starting_date",
  },
  
  {
    accessorKey: "image", //edit it to be images
    header: "Image",
    size: 100,
    Cell: ({ cell }) => (
      <div>
        <img src={cell.getValue()} alt="" width={60} />
      </div>
    ),
  },
  {
    accessorKey: "offer_depart", //access nested data with dot notation
    header: "offer_depart",
  },
  {
    accessorKey: "offer_dest", //access nested data with dot notation
    header: "offer_dest",
  },
  {
    accessorKey: "duration", //access nested data with dot notation
    header: "duration",
  },
  {
    accessorKey: "min_price",
    header: "min_price",
    Cell: ({ cell }) => <span>${cell.getValue()}</span>,
  },
  {
    accessorKey: "instock",
    header: "Status",
    //or in the component override callbacks like this
    Cell: ({ cell, row }) => (
      <div>
        {row.original.instock && (
          <span style={{ color: "#388b84", textTransform: "capitalize" }}>
            On Market
          </span>
        )}
        {!row.original.instock && (
          <span style={{ color: "#fd4332", textTransform: "capitalize" }}>
            Stopped
          </span>
        )}
      </div>
    ),
  },
];



const Products = () => {
  const { updatedProducts, setUpdatedProducts } = useProducts();
  const [loading, setLoading] = useState(true);
  const { agencyID, setAgencyID} = useAppContext();






  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axios(`/api/agency/${agencyID}`);
        const offers = response.data.offers;
        console.log("THE RESPONSE HIYA :",offers)

        const updatedProducts = offers.map((offer, index) => ({
          id: index + 1,
          offer_id : offer?.offer_id || 0,
          offer_name: offer?.offer_name || "No Offer",
          starting_date: offer?.starting_date || "No Date",
          offer_depart: offer?.offer_depart || "Not Available",
          offer_dest: offer?.offer_dest || "Not Available",
          duration: offer?.duration || "Unknown",
          min_price: offer?.min_price || "N/A",
          image: offer?.pictures[0] || "default_image_url",
          instock: !offer?.history_offer || false,
        }));

        setUpdatedProducts(updatedProducts);
        console.log("the updated data is :",updatedProducts)
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
