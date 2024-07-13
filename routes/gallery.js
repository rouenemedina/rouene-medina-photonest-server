import express from "express";
import multer from "multer";
import * as galleryController from "../controllers/gallery-controller.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.route("/:user_id").get(galleryController.galleryIndex);

router
  .route("/upload")
  .post(upload.array("files", 16), galleryController.uploadImg);

export default router;
