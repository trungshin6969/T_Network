import dotenv from "dotenv";
import cloudinary from "cloudinary";
import fs from "fs";

dotenv.config();

export default cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
