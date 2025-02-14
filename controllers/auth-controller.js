import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import initKnex from "knex";
import configuration from "../knexfile.js";

const knex = initKnex(configuration);

//Create a new user(sign-up)
//POST /auth/register
const userRegistration = async (req, res) => {
  const {
    user_first_name,
    user_last_name,
    user_email,
    user_password,
    user_type,
  } = req.body;

  if (
    !user_first_name ||
    !user_last_name ||
    !user_email ||
    !user_password ||
    !user_type
  ) {
    return res.status(400).json({
      message: "Please fill up the required fields.",
      error: "400",
    });
  }

  const hashedPassword = bcrypt.hashSync(user_password);

  const newUser = {
    user_first_name,
    user_last_name,
    user_email,
    user_password: hashedPassword,
    user_type,
  };

  try {
    await knex("users").insert(newUser);
    res.status(201).json({
      message: "Registered successfully.",
      error: "201",
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "Registration failed",
      error: "400",
    });
  }
};

//Login
//POST /auth/login
const userLogin = async (req, res) => {
  const { user_email, user_password } = req.body;

  if (!user_email || !user_password) {
    return res.status(400).json({
      message: "Please fill up the required fields.",
      error: "400",
    });
  }

  let user;
  try {
    user = await knex("users").where({ user_email: user_email }).first();
    if (!user) {
      return res.status(404).json({
        message: "Invalid email",
        error: "404",
      });
    }
  } catch (err) {
    console.log("Unexpected error:", err);
    res.status(500).json({
      message: "An unexpected error occurred. Please try again later.",
      error: "500",
    });
  }

  const verifyPassword = bcrypt.compareSync(user_password, user.user_password);
  if (!verifyPassword) {
    return res.status(401).json({
      message: "Authentication error",
      error: "401",
    });
  }

  const token = jwt.sign(
    { user_id: user.user_id, user_email: user.user_email },
    process.env.JWT_SECRET,
    { expiresIn: "5m" }
  );

  res.json({ user_id: user.user_id, user_type: user.user_type, token: token });
};

//verify Token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "Authentication error",
      error: "401",
    });
  }

  const authToken = authHeader.split(" ")[1];

  let decodedToken;
  try {
    decodedToken = jwt.verify(authToken, process.env.JWT_SECRET);
    req.user = decodedToken;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      message: "Authentication error",
      error: "401",
    });
  }
};

//GET /auth/profile
const getProfile = async (req, res) => {
  try {
    const userData = await knex("users")
      .where({ user_id: req.user.user_id })
      .first();
    delete userData.user_password;

    res.status(200).json(userData);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "An unexpected error occurred. Please try again later.",
      error: "500",
    });
  }
};

export { userRegistration, userLogin, verifyToken, getProfile };
