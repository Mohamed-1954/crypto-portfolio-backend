import { Router } from "express";
import { getCryptoById, getCryptos } from "./handlers";

const router = Router();

router.get("/", getCryptos);
router.get("/:id", getCryptoById);

export default router;