//NICE-TO-HAVES:

import initKnex from "knex";
import configuration from "../knexfile.js";
import "dotenv/config";

const knex = initKnex(configuration);

const getPhotographerList = async (req, res) => {
  const { user_type } = req.params;

  try {
    if (user_type === "photographer") {
      const records = await knex("user")
        .where("user_type", user_type)
        .select("user_id");

      res.status(200).json({
        message: "List of photographers retrieved successfully",
        data: records,
      });
    } else {
      res.status(404).json({
        message: "User type is not photographer",
        data: [],
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "Error retrieving list",
      error: "400",
    });
  }
};

export { getPhotographerList };