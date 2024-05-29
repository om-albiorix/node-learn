import { v2 as cloudinary } from "cloudinary";
import { response } from "express";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    const response = await cloudinary?.uploader?.upload(localFilePath, {
      resource_type: "auto",
    });
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    // remove the local below path as opertation got failed
    return null;
  }
};

cloudinary?.v2?.uploader?.upload(
  "/home/my_image.jpg",
  { upload_preset: "my_preset" },
  (error, result) => {
    console.log(result, error);
  }
);

export { uploadOnCloudinary };
