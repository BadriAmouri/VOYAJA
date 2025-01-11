import { supabase } from "./supabaseClient";

export const getImagesFromBucket = async (bucketName, folderPath = "") => {
  try {
    // List all files in the specified bucket/folder
    const { data: files, error } = await supabase.storage
      .from(bucketName)
      .list(folderPath);

    if (error) {
      console.error("Error fetching images:", error);
      throw error;
    }

    // Generate public URLs for each image
    const imageUrls = files
      .filter((file) => file.name.match(/\.(jpg|jpeg|png|gif|webp)$/i)) // Filter for image files
      .map((file) => {
        const { data } = supabase.storage
          .from(bucketName)
          .getPublicUrl(`${folderPath}${folderPath ? "/" : ""}${file.name}`);

        return data.publicUrl;
      });

    return imageUrls;
  } catch (error) {
    console.error("Error in getImagesFromBucket:", error);
    throw error;
  }
};

// Function to get a single image URL
export const getImageUrl = async (bucketName, imagePath) => {
  try {
    const { data } = supabase.storage.from(bucketName).getPublicUrl(imagePath);

    return data.publicUrl;
  } catch (error) {
    console.error("Error getting image URL:", error);
    throw error;
  }
};
