import express from "express";
import multer from "multer";
import * as heroController from "../controllers/hero-controller.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.route("/:user_id")
    .get(heroController.heroIndex);

    router.route("/upload")
    .post(upload.single("file"), heroController.uploadImg);

export default router;