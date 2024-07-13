import express from "express";
import multer from "multer";
import * as connectController from "../controllers/connect-controller.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.route("/:user_id")
    .get(connectController.connectIndex);

    router.route("/upload")
    .post(upload.single("file"), connectController.uploadImg);

export default router;