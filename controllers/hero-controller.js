import initKnex from "knex";
import configuration from "../knexfile.js";
import axios from "axios";
import fs from "fs";
import multer from "multer";
import FormData from "form-data";
import "dotenv/config";

const knex = initKnex(configuration);
const upload = multer({ dest: "uploads/" });

const cloudName = process.env.CLOUD_NAME;
const cloudSecret = process.env.CLOUD_SECRET;
const cloudKey = process.env.CLOUD_KEY;

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
        Authorization: `Basic ${Buffer.from(
          `${cloudKey}:${cloudSecret}`
        ).toString("base64")}`,
      },
    });
    return response.data.url;
  } catch (err) {
    console.log("Error uploading file", err);
    throw err;
  }
};

//POST /upload
const uploadImg = async (req, res) => {
  try {
    const file = req.file;
    const { hero_description, user_id } = req.body;

    //check if file exist
    if (!file) {
      return res.status(400).json({
        message: "No file uploaded.",
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
      hero_description,
      user_id,
      hero_url: imageUrl,
    };

    await knex("hero").where({ user_id: newImg.user_id }).delete();

    await knex("hero").insert(newImg);

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

//GET
const heroIndex = async (req, res) => {
  try {
    const { user_id } = req.params;

    const response = await knex("hero").where({ user_id }).first();
    res.status(200).json(response);
  } catch(err) {
    console.log(err);
    res.status(400).json({
      message: "Error retrieving Hero Form Details.",
      error: "400",
    });
  }
}

export { uploadImg, heroIndex };
