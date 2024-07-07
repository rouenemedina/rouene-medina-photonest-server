import express from "express";
import * as contactController from "../controllers/contact-controller.js";

const router = express.Router();

router.route("/contact")
    .post(contactController.addCommentMsg);

export default router;