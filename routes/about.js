import express from "express";
import multer from "multer";
import * as aboutController from "../controllers/about-controller.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.route("/").get(aboutController.allIndex);

router.route("/:user_id").get(aboutController.aboutIndex);

router
  .route("/upload")
  .post(upload.array("files", 2), aboutController.uploadImg);

export default router;
