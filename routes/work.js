import express from "express";
import multer from "multer";
import * as workController from "../controllers/work-controller.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.route("/:user_id").get(workController.workIndex);

router.route("/upload").post(upload.array('files', 3), workController.uploadImg);

export default router;
