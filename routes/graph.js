import express from "express";
import multer from "multer";
import * as msGraphController from "../controllers/graph-controller.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.route("/")
    .post(upload.single("file"), msGraphController.uploadImg);

export default router;