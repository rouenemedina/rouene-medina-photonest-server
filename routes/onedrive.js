import express from "express";
import multer from "multer";
import * as onedriveController from "../controllers/onedrive-controller.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.route("/upload")
    .post(upload.single("file"), onedriveController.uploadImg);

export default router;