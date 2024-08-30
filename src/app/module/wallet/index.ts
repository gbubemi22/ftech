import express from "express";
import { Create, GetWallet } from "./controller.js";
import { verifyToken } from '../../middleware/auth.js';

const router = express.Router();

router.route("/").get(verifyToken, Create);
router.route("/find").get(verifyToken, GetWallet);

export default router;
