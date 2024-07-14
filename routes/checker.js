import express from "express";
import * as checkerController from "../controllers/checker-controller.js";

const router = express.Router();

router.route("/:user_id")
  .get(checkerController.userChecker);

export default router;