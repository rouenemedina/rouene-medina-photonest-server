import express from "express";
import * as contactController from "../controllers/contact-controller.js";

const router = express.Router();

router.route("/")
    .post(contactController.addCommentMsg);

export default router;