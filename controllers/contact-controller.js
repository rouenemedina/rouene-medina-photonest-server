import initKnex from "knex";
import configuration from "../knexfile.js";

const knex = initKnex(configuration);

//POST /contact
const addCommentMsg = async (req, res) => {
  const { 
    contact_name, 
    contact_email, 
    contact_message, 
    contact_date 
    } = req.body;

  //validate
  if (!contact_name || !contact_email || !contact_message) {
    return res.status(400).json({
      message: "Please fill up the required fields.",
      error: "400",
    });
  }

  //no need to check existing comments because it doesn't require to be unique
  //anybody can post?

  //newContactMsg
  const newContactMsg = {
    contact_name,
    contact_email,
    contact_message,
  };

  try {
    await knex("contact").insert(newContactMsg);
    res.status(201).json({
      message: "Message successfully created.",
      error: "201",
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "An error occurred. Please try again",
      error: "400",
    });
  }
};

export { addCommentMsg };
