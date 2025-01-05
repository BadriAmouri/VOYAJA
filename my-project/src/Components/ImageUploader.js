import React, { useState } from 'react';
import { uploadLocalImage } from '../Supabase/supabaseStorage';

const ImageUploader = () => {
  const [imageUrl, setImageUrl] = useState(null); // State to store the image URL

  const handleUpload = async () => {
    try {
      const relativePath = '/Artboard.png'; // File path in the public folder
      const uploadedImageUrl = await uploadLocalImage(relativePath , 'users_profile_pictures'); // Upload the file and get the URL

      console.log('Uploaded Image URL:', uploadedImageUrl);

      // Set the image URL to state to display the image
      setImageUrl(uploadedImageUrl);
    } catch (error) {
      console.error('Upload failed:', error.message);
    }
  };

  return (
    <div>
      <button onClick={handleUpload}>Upload Artboard.png</button>

      {/* Display the uploaded image if imageUrl is set */}
      {imageUrl && (
        <div>
          <p>Uploaded Image:</p>
          <img src={imageUrl} alt="Uploaded Artboard" />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
