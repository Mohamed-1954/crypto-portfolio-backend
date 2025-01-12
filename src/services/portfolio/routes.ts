import { Router } from "express";
import { PortfolioController } from "./handlers";
import { AuthenticatedRequest } from "@/lib/AuthenticatedRequest";

const router = Router();
const portfolioController = new PortfolioController()

// GET ALL Portfolios for the authenticated user
router.get("/", (req, res) =>
    PortfolioController.getPortfolios(req as AuthenticatedRequest, res)
);

router.post("/", (req, res) =>
    PortfolioController.createPortfolio(req as AuthenticatedRequest, res)
);

// ADD a Cryptocurrency to a Portfolio
router.post("/:id/items", PortfolioController.addCryptoToPortfolio);

// FETCH Cryptocurrencies from CoinMarketCap API
router.get("/cryptos", PortfolioController.fetchCryptos);

// GET Portfolio Performance
router.get("/:id/performance", PortfolioController.viewPortfolioPerformance);

export default router;
