import { Router } from "express";
import { checkUser, onboardUser } from "../controllers/AuthController.js";

const router = Router();

router.post("/check-user", checkUser);
router.post("/onboard-user", onboardUser);

export default router;
