import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import { registeringSubscriptions, fetchSubscriptions, cancellingSubscriptions, updatingSusbcriptions } from "../controllers/subscription.controller.js";

const router = Router();

router.post("/register",verifyJWT, registeringSubscriptions);
router.delete("/cancel/:id",verifyJWT, cancellingSubscriptions);
router.post("/update/:id",verifyJWT, updatingSusbcriptions);
router.get("/fetch-subscriptions", verifyJWT, fetchSubscriptions);

export default router;