import { Router } from "express";
import { addMessage } from "../controllers/MessageController";

const router = Router();
router.post("/add-message", addMessage);

export default router;
