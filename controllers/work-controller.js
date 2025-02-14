import initKnex from "knex";
import configuration from "../knexfile.js";
import fs from "fs";
import "dotenv/config";
import { uploadToCloudinaryUsingAxios } from "../utils/cloudinaryUtils.js";

const knex = initKnex(configuration);

//POST /upload
const uploadImg = async (req, res) => {
  try {
    const { work_title1, work_title2, work_title3, user_id } = req.body;

    const uploadedFiles = req.files.map((file) => ({
      filename: file.filename,
      path: file.path,
    }));

    //check if the files exist
    if (uploadedFiles.length != 3) {
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

    const imageUrls = await Promise.all(
      uploadedFiles.map((file) => uploadToCloudinaryUsingAxios(file.path))
    );

    const newImages = [
        {work_title: work_title1, user_id, work_url: imageUrls[0]},
        {work_title: work_title2, user_id, work_url: imageUrls[1]},
        {work_title: work_title3, user_id, work_url: imageUrls[2]},
    ];

    //clear previous entries,
    await knex("work").where({ user_id: user_id }).delete();

    await knex("work").insert(newImages);

    uploadedFiles.forEach(file => {
        fs.unlinkSync(file.path);
    })
    
    res.json({ urls: imageUrls });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Unexpected error occurred. Please try again.",
      error: "500",
    });
  }
};

//GET /:user_id
const workIndex = async (req, res) => {
  try {
    const { user_id } = req.params;

    const response = await knex("work")
      .where({ user_id })
      .select("work_id", "work_title", "work_url", "user_id")
      .orderBy("work_id", "asc");

    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "Error retrieving Hero Form Details.",
      error: "400",
    });
  }
};

export { uploadImg, workIndex };
