import initKnex from "knex";
import configuration from "../knexfile.js";
import fs from "fs";
import "dotenv/config";
import { uploadToCloudinaryUsingAxios } from "../utils/cloudinaryUtils.js";

const knex = initKnex(configuration);

//POST /upload
const uploadImg = async (req, res) => {
  try {
    const { about_name, about_description, user_id } = req.body;
    console.log(req.body);
    const uploadedFiles = req.files.map((file) => ({
      filename: file.filename,
      path: file.path,
    }));

    // check if file exist
    if (uploadedFiles.length === 0) {
      return res.status(400).json({
        message: "No files uploaded.",
        error: "400",
      });
    }

    //minimum numbers of uploaded files
    if (uploadedFiles.length < 2) {
      return res.status(400).json({
        message: "At least 2 files are required.",
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
      uploadedFiles.map((file) => uploadToCloudinaryUsingAxios(file.path))
    );

    //store in "about" table
    const newImages = [
      { user_id, about_name, about_description, about_url: imageUrls[0] },
      { user_id, about_name, about_description, about_url: imageUrls[1] },
    ];

    //delete previous uploads
    await knex("about").where({ user_id: user_id }).delete();

    await knex("about").insert(newImages);

    uploadedFiles.forEach((file) => {
      fs.unlinkSync(file.path);
    });

    res.json({ urls: imageUrls });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Unexpected error occurred. Please try again.",
      error: "500",
    });
  }
};

// GET /:user_id
const aboutIndex = async (req, res) => {
  try {
    const { user_id } = req.params;

    const response = await knex("about")
      .where({ user_id })
      .select("about_name", "about_description", "about_url", "user_id");

    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "Error retrieving photographer information.",
      error: "400",
    });
  }
};

//GET /
const allIndex = async (req, res) => {
  try {
    const response = await knex
      .from("about")
      .whereIn(["about_id", "user_id"], function () {
        this.select(knex.raw("min(about_id) as about_id"), "user_id")
          .from("about")
          .groupBy("user_id");
      });

    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "Error retrieving photographer information.",
      error: "400",
    });
  }
};

export { uploadImg, aboutIndex, allIndex };
