import React, { useState, useEffect } from "react";
import "../../Style/ProfileBanner.css";
import image1 from "../../assets/Profile/bg.jpg";
import image2 from "../../assets/Profile/user.jpg";
import { useAppContext } from "../../contexts/AppContext";
import { supabase } from "../../Supabase/supabaseClient"; // Supabase client

const ProfileBanner = () => {
  const [user, setUser] = useState(null); // To store user data
  const [profilePhoto, setProfilePhoto] = useState(image2); // Default profile image
  const [error, setError] = useState(null); // To handle errors
  const { clientID } = useAppContext(); // Assuming clientID comes from AppContext

  // Fetch user info
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(`/client/${clientID}`);
        if (!response.ok) {
          throw new Error("User not found or error occurred");
        }
        const data = await response.json();
        setUser(data.user); // Update state with user data
        console.log("The data is ", data); // Logs the fetched data

        // If the user has a profile image, update the profile photo state
        if (data.user.client_pic) {
          // Make sure to use the public URL from Supabase if available
          setProfilePhoto(data.user.client_pic);
        }
      } catch (error) {
        setError(error.message); // Set error if any
      }
    };

    fetchUserInfo();
  }, [clientID]); // Run effect when component mounts

  // Logging user data when it's updated
  useEffect(() => {
    if (user) {
      console.log("The user DATA are:", user);
    }
  }, [user]);

  // Handle file upload for profile picture
  const handleProfilePhotoChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        // Sanitize the file name to avoid issues
        const sanitizedFileName = file.name.replace(/\s+/g, "_").replace(/[^a-zA-Z0-9_.-]/g, "");
  
        // Upload to Supabase Storage with user-specific path
        const { data, error } = await supabase.storage
          .from("users_profile_pictures") // Bucket name
          .upload(`profiles/${clientID}/${sanitizedFileName}`, file);
  
        if (error) {
          throw error;
        }
  
        // Fetch the public URL of the uploaded image
        const { data: publicUrlData, error: urlError } = supabase.storage
          .from("users_profile_pictures")
          .getPublicUrl(`profiles/${clientID}/${sanitizedFileName}`);
  
        if (urlError) {
          throw urlError;
        }
  
        const publicUrl = publicUrlData.publicUrl;
        console.log("Uploaded Image URL:", publicUrl);
  
        // Update the profile image URL in PostgreSQL by calling the backend
        const updateResponse = await fetch("/client/update-profile-image", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            client_id: clientID,
            image_url: publicUrl,
          }),
        });

        if (!updateResponse.ok) {
          throw new Error("Failed to update profile image in database.");
        }

        const updatedUser = await updateResponse.json();
        console.log("Updated user data:", updatedUser);

        // Set the uploaded image URL to display it (with cache busting)
        setProfilePhoto(`${publicUrl}?t=${Date.now()}`);
      } catch (error) {
        console.error("Error uploading profile photo:", error.message);
        setError(error.message);
      }
    }
  };

  // Render loading state until data is available
  if (!user) {
    return <div>Loading...</div>;
  }

  // If error occurs, display error message
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="profile-banner">
      <div className="banner">
        <img src={image1} className="bg" alt="Background" />

        <div className="profile-photo">
          <img
            src={profilePhoto}
            alt="Profile"
            className="profile-image"
            onClick={() => document.getElementById("fileInput").click()}
          />
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleProfilePhotoChange}
          />
        </div>
      </div>
      <div className="profile-info">
        <h2>
          {user.client_first_name} {user.client_last_name}
        </h2>
        <p>{user.client_email}</p>
      </div>
    </div>
  );
};

export default ProfileBanner;
