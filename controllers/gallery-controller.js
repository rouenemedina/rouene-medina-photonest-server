import initKnex from "knex";
import configuration from "../knexfile.js";
import fs from "fs";
import path from "path";
import "dotenv/config";
import { uploadToCloudinaryUsingAxios } from "../utils/cloudinaryUtils.js";

const knex = initKnex(configuration);

//POST /upload
const uploadImg = async (req, res) => {
  try {
    const { user_id } = req.body;

    console.log(req.body)
    const uploadedFiles = req.files.map((file) => ({
      filename: file.filename,
      path: file.path,
    }));

    //check if file exist
    if (uploadedFiles.length === 0) {
      return res.status(400).json({
        message: "No files uploaded.",
        error: "400",
      });
    }

    //minimum numbers of uploaded files 
    if (uploadedFiles.length < 8) {
        return res.status(400).json({
            message: "At least 8 files are required.",
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

    const imageUrls = await Promise.all(
      uploadedFiles.map(async (file) => {
        const imageUrl = await uploadToCloudinaryUsingAxios(file.path);
        fs.unlinkSync(path.resolve(file.path));
        return imageUrl;
      })
    );

    //store in "gallery" table
    const newImgs = imageUrls.map(url => ({
      user_id,
      gallery_url: url,
    }));

    //delete previous uploads
    // await knex("gallery").where({ user_id: user_id }).delete();

    await knex("gallery").insert(newImgs);

    res.json({ imageUrls });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Unexpected error occurred. Please try again.",
      error: "500",
    });
  }
};

// GET /:user_id
const galleryIndex = async (req, res) => {
  try {
    const { user_id } = req.params;

    const response = await knex("gallery")
      .where({ user_id })
      .select("gallery_url", "user_id");

    if (response.length === 0) {
      return res.status(404).json({
        message: "No works found for this photographer.",
        error: "404",
      });
    }

    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "Error retrieving gallery details.",
      error: "400",
    });
  }
};

export { uploadImg, galleryIndex };
