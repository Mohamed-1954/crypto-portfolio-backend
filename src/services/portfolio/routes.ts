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

/**
 * @swagger
 * /portfolios:
 *   get:
 *     summary: List all portfolios for the authenticated user
 *     responses:
 *       200:
 *         description: A list of portfolios
 */
router.get("/", getPortfolios);

/**
 * @swagger
 * /portfolios:
 *   post:
 *     summary: Create a new portfolio
 *     responses:
 *       201:
 *         description: Portfolio created
 */
router.post("/", createPortfolio);

/**
 * @swagger
 * /portfolios/{id}:
 *   get:
 *     summary: Retrieve details of a specific portfolio
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Portfolio details
 */
router.get("/:id", getPortfolioById);

/**
 * @swagger
 * /portfolios/{id}:
 *   put:
 *     summary: Update an existing portfolio
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Portfolio updated
 */
router.put("/:id", updatePortfolio);

/**
 * @swagger
 * /portfolios/{id}:
 *   delete:
 *     summary: Remove a portfolio
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Portfolio deleted
 */
router.delete("/:id", deletePortfolioById);

export default router;
