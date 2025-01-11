import { supabase } from "./supabaseClient";

export const uploadLocalImage = async (filePath, backetName) => {
  try {
    // Fetch the file as a Blob
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`Failed to fetch the file: ${filePath}`);
    }

    const fileBlob = await response.blob();
    const fileName = filePath.split("/").pop();
    const sanitizedFileName = fileName.replace(/\s+/g, "_");
    const destinationPath = `images/${sanitizedFileName}`;

    // Upload to Supabase
    const { data, error } = await supabase.storage
      .from(backetName)
      .upload(destinationPath, fileBlob);

    if (error) {
      console.error("Supabase error:", error);
      throw error;
    }

    // getting the image URL
    console.log("Uploaded successfully:", data);
    console.log(
      "Public URL:",
      `https://alwrvxkphnxmqdxnrytf.supabase.co/storage/v1/object/public/${data.fullPath}`
    ); // Log the URL
    const publicURL = `https://alwrvxkphnxmqdxnrytf.supabase.co/storage/v1/object/public/${data.fullPath}`;
    return publicURL; // Return the public URL
  } catch (error) {
    console.error("Error uploading image:", error.message);
    throw error;
  }
};
