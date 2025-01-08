import { supabase } from "./supabaseClient";

export const uploadLocalImage = async (filePath, bucketName) => {
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`Failed to fetch the file: ${filePath}`);
    }

    const fileBlob = await response.blob();
    const fileName = filePath.split("/").pop();
    const sanitizedFileName = fileName.replace(/\s+/g, "_");
    const destinationPath = `${sanitizedFileName}`;

    // Upload to Supabase
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(destinationPath, fileBlob);

    if (error) {
      console.error("Supabase error:", error);
      throw error;
    }

    // Return the public URL of the uploaded image
    const publicURL = `https://<your-supabase-url>.co/storage/v1/object/public/${bucketName}/${data.path}`;
    return publicURL;
  } catch (error) {
    console.error("Error uploading image:", error.message);
    throw error;
  }
};
