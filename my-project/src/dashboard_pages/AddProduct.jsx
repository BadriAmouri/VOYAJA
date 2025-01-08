import styled from "@emotion/styled";
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { BiImageAdd } from "react-icons/bi";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers";
import { useAppContext } from "../contexts/AppContext";
import { uploadLocalImage } from '../Supabase/supabaseStorage';


const AddProduct = () => {
  const imageInput = useRef(null);
  const [images, setImages] = useState([]);
  const [options, setOptions] = useState([]);
  const [newOption, setNewOption] = useState({ option_title: "", option_price: "" });
  const { agencyID, setAgencyID} = useAppContext();
  const [uploadedUrls, setUploadedUrls] = useState([]); // State to store the uploaded image URLs


  // State to store form data
  const [formData, setFormData] = useState({
    offer_name: "",
    offer_description: "",
    starting_date: "",
    duration: 0,
    offer_dest : '',
    offer_depart : '',
    pictures: [],
    Age_policy: "",
    min_price: 0,
    included: ["Guided Hikes", "Equipment Rental"],
    history_offer: false,
    agency_id: agencyID,
  });


  // Handle the image change when files are selected
  const handleImageChange = async (e) => {
    const selectedFiles = Array.from(e.target.files); // Convert FileList to an array
    setImages(selectedFiles); // Store selected files in state
    
    try {
      const uploadPromises = selectedFiles.map(async (file) => {
        // Assuming file is a path to a file in the local system or public folder, 
        // adjust the filePath as needed.
        const filePath = URL.createObjectURL(file); // Convert the file to a URL
        const uploadedImageUrl = await uploadLocalImage(filePath, 'offers_pictures'); // Upload each file and get the URL
        return uploadedImageUrl;
      });
      
      // Wait for all uploads to complete
      const uploadedImageUrls = await Promise.all(uploadPromises);

      // Update state with uploaded image URLs
      setUploadedUrls(uploadedImageUrls);

      console.log('Uploaded Image URLs:', uploadedImageUrls);
       // Update formData with the uploaded image URLs in the pictures field
       setFormData((prevData) => ({
        ...prevData,
        pictures: uploadedImageUrls, // Set the uploaded image URLs to pictures
      }));

    } catch (error) {
      console.error('Upload failed:', error.message);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updatedData = {
        ...prev,
        [name]: name === "min_price" || name === "duration" ? parseInt(value, 10) || 0 : value,
      };

      if (name === "included") {
        return {
          ...updatedData,
          included: value.split(",").map((item) => item.trim()),
        };
      }

      return updatedData;
    });
  };
  
  const handleDateChange = (date) => {
    const formattedDate = new Date(date).toISOString().split('T')[0];
    setFormData((prev) => ({
      ...prev,
      starting_date: formattedDate,
    }));
  };
  

  const handleOptionChange = (e) => {
    const { name, value } = e.target;
    setNewOption((prev) => ({ ...prev, [name]: value }));
  };

  const addOption = () => {
    if (newOption.option_title && newOption.option_price) {
      setOptions((prev) => [...prev, newOption]);
      setNewOption({ option_title: "", option_price: "" });
    } else {
      alert("Please fill in both option title and price.");
    }
  };
  
  const removeImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const UploadBox = styled(Box)({
    marginTop: 30,
    height: 200,
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    borderStyle: "dashed",
    borderWidth: "2px",
    borderColor: "divider",
  });

  const handleRequest = async () => {
    try {
      const payload = { offerData: formData, options };
      console.log("Payload being sent:", JSON.stringify(payload, null, 2));
  
      const response = await fetch("/api/offers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      const result = await response.json();
      console.log("Offer created successfully:", result);
      alert("Offer created successfully!");
    } catch (error) {
      console.error("Failed to create offer:", error.message);
      alert("Failed to create offer. Please try again.");
    }
  };
  
  
  useEffect(() => {
    console.log("the offer data is : " + JSON.stringify(formData, null, 2) + JSON.stringify(options, null, 2));

  }, [formData]); // Dependency array
  return (
    <Box sx={{ pt: "80px", pb: "20px" }}>
      <Typography variant="h6" sx={{ marginBottom: "14px" }}>
        Add Offer
      </Typography>
      <Paper
        sx={{
          boxShadow: "none !important",
          borderRadius: "12px",
          borderStyle: "solid",
          borderWidth: "1px",
          borderColor: "divider",
          p: "20px",
          maxWidth: "800px",
          margin: "0 auto",
          cursor: "pointer",
          overflow: "hidden",
        }}
      >
        <Box sx={{ my: 2 }}>
          <TextField
            label="Offer Name"
            variant="outlined"
            size="small"
            name="offer_name"
            value={formData.offer_name}
            onChange={handleInputChange}
            fullWidth
          />
        </Box>
        <Box sx={{ mt: 4 }}>
          <TextField
            label="Offer Description"
            variant="outlined"
            rows={4}
            name="offer_description"
            value={formData.offer_description}
            onChange={handleInputChange}
            fullWidth
            multiline
          />
        </Box>

        <Box sx={{ mt: 4, display: "flex", alignItems: "center", gap: 4 }}>
          <TextField
            label="Depart city"
            variant="outlined"
            rows={4}
            size="small"
            name="offer_depart"
            value={formData.offer_depart}
            onChange={handleInputChange}
            fullWidth
          />
       
        
          <TextField
            label="Destination city"
            variant="outlined"
            rows={4}
            size="small"
            name="offer_dest"
            value={formData.offer_dest}
            onChange={handleInputChange}
            fullWidth
          />
        </Box>

        <Box  sx={{ mt: 4, display: "flex", alignItems: "center", gap: 4 }}>
   
        <LocalizationProvider dateAdapter={AdapterDateFns}>
  <DatePicker
    label="Date of Offer"
    name="starting_date"
    value={formData.starting_date}
    onChange={handleDateChange}  
    renderInput={(params) => <TextField {...params} fullWidth />}
  />
</LocalizationProvider>
        <TextField
            label="number of days"
            variant="outlined"
            rows={4}
            size="small"
            name="duration"
            value={formData.duration}
            onChange={handleInputChange}
            fullWidth
          />

        </Box>
        
        

        <Box sx={{ mt: 4, display: "flex", alignItems: "center", gap: 4 }}>
          <TextField
            label="Price"
            variant="outlined"
            rows={4}
            fullWidth
            size="small"
            name="min_price"
            value={formData.min_price}
            onChange={handleInputChange}
            defaultValue={"$234.24"}
          />
          <TextField
            label="Discount"
            variant="outlined"
            rows={4}
            fullWidth
            size="small"
            defaultValue={"20%"}
          />
        </Box>
        <Box sx={{ mt: 4 }}>
          <TextField
            label="Included"
            variant="outlined"
            rows={4}
            name="included"
            value={formData.included}
            onChange={handleInputChange}
            fullWidth
            multiline
          />
          
        </Box>
        <Box sx={{ mt: 2 }}>
          <TextField
            label="Offer Policies"
            variant="outlined"
            rows={4}
            size="small"
            name="Age_policy"
            value={formData.Age_policy}
            onChange={handleInputChange}
            fullWidth
            multiline
          />
        </Box>
        <Box sx={{ mt: 4, display: "flex", gap: 2 }}>
          <TextField
            label="Option Title"
            variant="outlined"
            size="small"
            name="option_title"
            value={newOption.option_title}
            onChange={handleOptionChange}
            fullWidth
          />
          <TextField
            label="Option Price"
            variant="outlined"
            size="small"
            name="option_price"
            value={newOption.option_price}
            onChange={handleOptionChange}
            fullWidth
          />
          <Button variant="contained" onClick={addOption}>
            Add Option
          </Button>
        </Box>
        <Box sx={{ mt: 4 }}>
          <TextField
            label="Options Added"
            variant="outlined"
            rows={4}
            value={JSON.stringify(options, null, 2)}
            fullWidth
            multiline
            InputProps={{ readOnly: true }}
          />
        </Box>
        <input
        type="file"
        hidden
        ref={imageInput}
        multiple
        accept="image/jpeg, image/png, image/gif"
        onChange={handleImageChange}
      />
      <UploadBox onClick={() => imageInput.current.click()}>
        {images.length > 0 ? (
          <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <Typography sx={{ mb: 2 }}>
              Selected Images ({images.length}):
            </Typography>
            <Box sx={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {images.map((image, index) => (
                <Box
                  key={index}
                  sx={{
                    position: "relative",
                    width: "120px",
                    height: "120px",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`preview-${index}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <Button
                    onClick={() => removeImage(index)}
                    sx={{
                      position: "absolute",
                      top: "5px",
                      right: "5px",
                      backgroundColor: "rgba(0,0,0,0.6)",
                      color: "#fff",
                      fontSize: "12px",
                      minWidth: "auto",
                      padding: "4px",
                      borderRadius: "50%",
                      lineHeight: 1,
                    }}
                  >
                    ✕
                  </Button>
                </Box>
              ))}
            </Box>
          </Box>
        ) : (
          <Box sx={{ textAlign: "center" }}>
            <BiImageAdd style={{ fontSize: "50px", color: "#027edd" }} />
            <Typography>
              Drop your image here or{" "}
              <span style={{ color: "#027edd", cursor: "pointer" }}>
                browse
              </span>
            </Typography>
            <Typography sx={{ fontSize: "12px" }}>
              JPG, PNG and GIF images are allowed
            </Typography>
          </Box>
        )}
      </UploadBox>
    
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: "30px",
          }}
        >
          <Button 
          onClick={handleRequest}
          variant="contained" sx={{ borderRadius: "20px" }}>
            Submit
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default AddProduct;

