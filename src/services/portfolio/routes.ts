import { Router } from "express";
import {
  getPortfolios,
  createPortfolio,
  getPortfolioById,
  updatePortfolio,
  deletePortfolioById,
} from "./handlers";
import { ensureAuthenticated } from "../auth/middlewares";

export const router = Router();

router.use(ensureAuthenticated)

router.get("/", getPortfolios);

router.post("/", createPortfolio);

router.get("/:id", getPortfolioById);

router.put("/:id", updatePortfolio);

router.delete("/:id", deletePortfolioById);

export default router;
