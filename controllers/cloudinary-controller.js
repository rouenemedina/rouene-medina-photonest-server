import initKnex from "knex";
import configuration from "../knexfile.js";
import axios from "axios";
import fs from "fs";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import FormData from "form-data";
import "dotenv/config";

const knex = initKnex(configuration);
const upload = multer({ dest: "uploads/" });

const cloudName = process.env.CLOUD_NAME;
const cloudSecret = process.env.CLOUD_SECRET;
const cloudKey = process.env.CLOUD_KEY;

// cloudinary.config({
//   cloudName,
//   cloudSecret,
//   cloudKey,
// });

const uploadToCloudinaryUsingAxios = async (filePath) => {

    try {
        const formData = new FormData();
        const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
        const filesStream = fs.createReadStream(filePath);
        formData.append("file", filesStream);
        formData.append("upload_preset", "photonest_unsigned");
        formData.append("api_key", cloudKey);

        console.log(formData);

        const response = await axios.post(cloudinaryUrl, formData, {
            headers: {
                ...formData.getHeaders(),
                Authorization: `Basic ${Buffer.from(`${cloudKey}:${cloudSecret}`).toString("base64")}`,
            },
        });
        return response.data.url;
    } catch(err){
        console.log("Error uploading file", err);
        throw err;
    }
}

// const uploadToCloudinary = async (filePath) => {
//   try {
//     const response = await cloudinary.uploader.upload(filePath);
//     return response.secure_url;
//   } catch (err) {
//     console.log("Error uploading file:", err);
//     throw err;
//   }
// };

//POST /upload
const uploadImg = async (req, res) => {

  try {
    const file = req.file;
    const { image_title, image_description, image_tags, category_id, user_id } =
      req.body;
    
    //check if file exist
    if (!file) {
      return res.status(400).json({
        message: "No file uploaded.",
        error: "400",
      });
    }

    //check if category_id exist
    if (!category_id) {
      return res.status(400).json({
        message: "No category ID provided.",
        error: "400",
      });
    }
    //check if user_id exist
    if (!user_id) {
      return res.status(400).json({
        message: "No user ID provided.",
        error: "400",
      });
    }

    const imageUrl = await uploadToCloudinaryUsingAxios(file.path);

    //store in "photos" table
    const newImg = {
      image_title,
      image_description,
      category_id,
      user_id,
      image_tags,
      image_url: imageUrl,
    };

    console.log(newImg);

    await knex("photos").insert(newImg);

    fs.unlinkSync(file.path);

    res.json({ url: imageUrl });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Unexpected error occurred. Please try again.",
      error: "500",
    });
  }
};

export { uploadImg };
