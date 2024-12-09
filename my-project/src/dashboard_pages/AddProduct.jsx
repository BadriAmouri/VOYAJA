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
import React, { useRef, useState } from "react";
import { BiImageAdd } from "react-icons/bi";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers";

const AddProduct = () => {
  const imageInput = useRef(null);
  const [images, setImages] = useState([]);
  const [offerDate, setOfferDate] = useState(null);


  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setImages(selectedFiles);
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
            fullWidth
          />
        </Box>
        <Box sx={{ mt: 4 }}>
          <TextField
            label="Offer Description"
            variant="outlined"
            rows={4}
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
            fullWidth
          />
        
        
          <TextField
            label="Destination city"
            variant="outlined"
            rows={4}
            size="small"
            fullWidth
          />
        </Box>

        <Box  sx={{ mt: 4, display: "flex", alignItems: "center", gap: 4 }}>
        
        <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="Date of Offer"
        value={offerDate}
        onChange={(newValue) => setOfferDate(newValue)}
        renderInput={(params) => <TextField {...params} fullWidth />}
      />
      </LocalizationProvider> 
        
        
        
        <TextField
            label="number of days"
            variant="outlined"
            rows={4}
            size="small"
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
            label="Offer Policies"
            variant="outlined"
            rows={4}
            fullWidth
            multiline
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
          <Button variant="contained" sx={{ borderRadius: "20px" }}>
            Submit
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default AddProduct;
