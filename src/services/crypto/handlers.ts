import axiosClient from "@/config/axios";
import config from "@/config/config";
import type { CryptoCurrency } from "@/types/types";
import type { Request, Response } from "express";
import type { GetCryptoByIdRequest } from "./request-types";
import { z } from "zod";

interface CMCResponse {
  data: CryptoCurrency[];
}

export const getCryptos = async (req: Request, res: Response) => {
  try {
    const response = await axiosClient.get<CMCResponse>(
      "/v1/cryptocurrency/listings/latest",
      {
        headers: {
          "X-CMC_PRO_API_KEY": config.coinMarketCap.apiKey,
        },
        params: {
          start: 1,
          limit: 50,
          convert: "USD",
        },
      }
    );

    res.status(200).json(response.data.data);
  } catch (error) {
    console.error("Error fetching cryptocurrencies from CoinMarketCap:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getCryptoById = async (req: GetCryptoByIdRequest, res: Response) => {
  try {
    const { error, data: id } = z.coerce.number().safeParse(req.params.id);
    if (error) {
      res.status(400).json({ error: "Invalid crypto ID" });
      return;
    }

    const response = await axiosClient.get(
      "/v1/cryptocurrency/listings/latest",
      {
        headers: {
          "X-CMC_PRO_API_KEY": config.coinMarketCap.apiKey,
        },
        params: {
          start: 1,
          limit: 50,
          convert: "USD",
        },
      }
    );

    const crypto = response.data.data.find(
      (c: CryptoCurrency) => c.id === id
    );

    res.status(200).json(crypto);
  } catch (error) {
    console.error("Error fetching cryptocurrencies from CoinMarketCap:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// export const viewPortfolioPerformance = async (req: Request, res: Response) => {
//   try {
//     const { id: portfolioId } = req.params;

//     const portfolioItemsResult = await db
//       .select()
//       .from(portfolioItems)
//       .where(eq(portfolioItems.portfolioId, parseInt(portfolioId, 10)));

//     const portfolioItemsData = portfolioItemsResult;
//     const cryptoIds = portfolioItemsData.map((item) => item.cryptoId).join(",");

//     const response = await axiosClient.get("", {
//       headers: {
//         "X-CMC_PRO_API_KEY": config.coinMarketCap.apiKey,
//       },
//       params: {
//         id: cryptoIds,
//         convert: "USD",
//       },
//     });

//     const cryptoData: CryptoData[] = response.data.data;

//     const performance = portfolioItemsData.map((item) => {
//       const crypto = cryptoData.find(
//         (c: CryptoData) => String(c.id) === item.cryptoId
//       );
//       if (!crypto) {
//         throw new Error(`Crypto data for ID ${item.cryptoId} not found`);
//       }

//       const currentPrice = crypto.quote.USD.price;
//       const currentValue = currentPrice * item.quantity;
//       const profitLoss = currentValue - item.acquisitionCost * item.quantity;

//       return {
//         crypto_id: item.cryptoId,
//         quantity: item.quantity,
//         acquisition_cost: item.acquisitionCost,
//         current_price: currentPrice,
//         current_value: currentValue,
//         profit_loss: profitLoss,
//       };
//     });

//     res.status(200).json(performance);
//   } catch (error) {
//     console.error("Error fetching portfolio performance:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };
