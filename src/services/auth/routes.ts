import { Router } from "express";
import { logOut, refreshToken, signIn, signUp } from "./handlers";

const router = Router();

router.post("/sign-up", signUp);

router.post("/sign-in", signIn);

router.post("/refresh-token", refreshToken);

router.post("/log-out", logOut);

export default router;