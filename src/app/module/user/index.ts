import express from "express";
import { Create } from "./controller.js";

const router = express.Router();

router.route("create").post(Create);
router.route("login").post(Create);

export default router;
