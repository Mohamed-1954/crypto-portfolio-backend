import { Request, Response } from "express";
import axios from "axios";
import db from "../../db";
import portfolio from "@/db/schema/portfolio";
import portfolioItem from "@/db/schema/portfolio-item";
import { eq } from "drizzle-orm";
import env from "@/lib/env";
import { AuthenticatedRequest } from "@/lib/AuthenticatedRequest";


if (!env.COINMARKET_API_KEY) {
    throw new Error("Missing CoinMarketCap API key in environment variables");
}

interface CryptoData {
    id: number;
    quote: {
        USD: {
            price: number;
        };
    };
}

export class PortfolioController {
    /**
     * Get list of all portfolios for the authenticated user
     */
    static getPortfolios = async (req: AuthenticatedRequest, res: Response) => {
        try {
            const userId = req.body.id;

            const result = await db.select().from(portfolio).where(eq(portfolio.userId, userId));
            res.status(200).json(result);
        } catch (error) {
            console.error("Error fetching portfolios:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    };

    /**
     * Create a new portfolio
     */
    static createPortfolio = async (req: AuthenticatedRequest, res: Response) => {
        try {

            const { name ,userId} = req.body;

            const result = await db
                .insert(portfolio)
                .values({
                    userId,
                    name,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                })
                .returning();

            res.status(201).json(result[0]);
        } catch (error) {
            console.error("Error creating portfolio:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    };

    /**
     * Add a cryptocurrency to a portfolio
     */
    static addCryptoToPortfolio = async (req: Request, res: Response) => {
        try {
            const { id: portfolioId } = req.params;
            const { crypto_id, quantity, acquisition_cost } = req.body;

            const result = await db
                .insert(portfolioItem)
                .values({
                    portfolioId: parseInt(portfolioId, 10),
                    cryptoId: crypto_id,
                    quantity,
                    acquisitionCost: acquisition_cost,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                })
                .returning();

            res.status(201).json(result[0]);
        } catch (error) {
            console.error("Error adding cryptocurrency to portfolio:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    };

    /**
     * Fetch cryptocurrency data from CoinMarketCap API
     */
    static fetchCryptos = async (req: Request, res: Response) => {
        try {
            const response = await axios.get(env.COINMARKET_API_URL, {
                headers: {
                    "X-CMC_PRO_API_KEY": env.COINMARKET_API_KEY,
                },
                params: {
                    start: 1,
                    limit: 50,
                    convert: "USD",
                },
            });

            res.status(200).json(response.data.data);
        } catch (error) {
            console.error("Error fetching cryptocurrencies from CoinMarketCap:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    };

    /**
     * View portfolio performance (value, profit/loss)
     */
    static viewPortfolioPerformance = async (req: Request, res: Response) => {
        try {
            const { id: portfolioId } = req.params;

            const portfolioItemsResult = await db
                .select()
                .from(portfolioItem)
                .where(eq(portfolioItem.portfolioId, parseInt(portfolioId, 10)));

            const portfolioItemsData = portfolioItemsResult;
            const cryptoIds = portfolioItemsData.map((item) => item.cryptoId).join(",");

            const response = await axios.get(env.COINMARKET_API_URL, {
                headers: {
                    "X-CMC_PRO_API_KEY": env.COINMARKET_API_KEY,
                },
                params: {
                    id: cryptoIds,
                    convert: "USD",
                },
            });

            const cryptoData: CryptoData[] = response.data.data;

            const performance = portfolioItemsData.map((item) => {
                const crypto = cryptoData.find((c: CryptoData) => String(c.id) === item.cryptoId);
                if (!crypto) {
                    throw new Error(`Crypto data for ID ${item.cryptoId} not found`);
                }

                const currentPrice = crypto.quote.USD.price;
                const currentValue = currentPrice * item.quantity;
                const profitLoss = currentValue - item.acquisitionCost * item.quantity;

                return {
                    crypto_id: item.cryptoId,
                    quantity: item.quantity,
                    acquisition_cost: item.acquisitionCost,
                    current_price: currentPrice,
                    current_value: currentValue,
                    profit_loss: profitLoss,
                };
            });

            res.status(200).json(performance);
        } catch (error) {
            console.error("Error fetching portfolio performance:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    };
}
