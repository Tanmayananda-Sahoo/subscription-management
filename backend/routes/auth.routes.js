import { Router } from "express";
import { loginUser, registerUser, logOutUser, checkAuth } from "../controllers/auth.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";
const router = Router();

router.post("/login",loginUser);
router.post("/register",registerUser);
router.post("/logout",verifyJWT, logOutUser);
router.get("/check-auth", verifyJWT, checkAuth);
export default router;