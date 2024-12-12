import { Avatar, Divider, TextField, Typography, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState, useEffect } from "react";
import { Instagram, Facebook, WhatsApp } from "@mui/icons-material"; // Importing icons

const Profile = () => {
  const [profileData, setProfileData] = useState({
    agency_id: "",
    agency_name: "",
    agency_location: "",
    agency_phone_number: "",
    agency_email: "",
    agency_password_hash: "",
    agency_description: "",
    experience: "",
    insta_link: "",
    whatsapp_link: "",
    facebook_link: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/agency/4", { method: "GET" });

        if (!response.ok) {
          const errorBody = await response.text();
          throw new Error(
            `Network response was not ok: ${response.status} ${errorBody}`
          );
        }

        const data = await response.json();
        setProfileData(data);
      } catch (error) {
        console.log("Error in fetching profile data:", error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <Box>
      <Typography variant="subtitle1" className="text-white">Profile</Typography>
      <Divider />
      <Box sx={{ mt: 3 }}>
        <div className="flex justify-center">
          <Avatar src="/images/avatars/profile-avatar.png" />
        </div>
        <Box sx={{ mt: 4, display: "flex", alignItems: "center", gap: 4 }}>
          <TextField
            label="Agency Name"
            variant="outlined"
            fullWidth
            size="small"
            value={profileData.agency_name}
            onChange={(e) =>
              setProfileData({ ...profileData, agency_name: e.target.value })
            }
          />
          <TextField
            label="Location"
            variant="outlined"
            fullWidth
            size="small"
            value={profileData.agency_location}
            onChange={(e) =>
              setProfileData({ ...profileData, agency_location: e.target.value })
            }
          />
        </Box>
        <Box sx={{ my: 2 }}>
          <TextField
            label="Email"
            variant="outlined"
            size="small"
            fullWidth
            value={profileData.agency_email}
            onChange={(e) =>
              setProfileData({ ...profileData, agency_email: e.target.value })
            }
          />
        </Box>
        <Box sx={{ my: 2 }}>
          <TextField
            label="Phone"
            variant="outlined"
            size="small"
            fullWidth
            value={profileData.agency_phone_number}
            onChange={(e) =>
              setProfileData({
                ...profileData,
                agency_phone_number: e.target.value,
              })
            }
          />
        </Box>
        <Box sx={{ my: 2 }}>
          <TextField
            label="Description"
            variant="outlined"
            size="small"
            fullWidth
            multiline
            rows={4}
            value={profileData.agency_description}
            onChange={(e) =>
              setProfileData({
                ...profileData,
                agency_description: e.target.value,
              })
            }
          />
        </Box>
        <Box sx={{ my: 2 }}>
          <TextField
            label="Experience"
            variant="outlined"
            size="small"
            fullWidth
            value={profileData.experience}
            onChange={(e) =>
              setProfileData({ ...profileData, experience: e.target.value })
            }
          />
        </Box>
        <Box sx={{ my: 2, display: "flex", gap: 2, alignItems: "center" }}>
          <IconButton
            component="a"
            href={profileData.insta_link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram color="primary" />
          </IconButton>
          <IconButton
            component="a"
            href={profileData.facebook_link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Facebook color="primary" />
          </IconButton>
          <IconButton
            component="a"
            href={profileData.whatsapp_link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsApp color="success" />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
