import express from "express";
import * as authController from "../controllers/auth-controller.js";

const router = express.Router();

router.route("/register")
  .post(authController.userRegistration);

router.route("/login")
  .post(authController.userLogin);

router.route("/profile")
  .get(authController.getProfile);

export default router;
