import { Router } from "express";
import { getCryptoById, getCryptos } from "./handlers";
import { ensureAuthenticated } from "../auth/middlewares";

const router = Router();

router.use(ensureAuthenticated)

router.get("/", getCryptos);
router.get("/:id", getCryptoById);

export default router;