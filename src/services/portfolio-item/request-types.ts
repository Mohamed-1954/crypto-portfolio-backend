import type { PortfolioItem } from "@/types/schema";
import type { Request } from "express";

export interface AddCryptoToPortfolioRequest extends Request {
  params: {
    id: string;
  };
  body: PortfolioItem;
}

export interface UpdateCryptoInPortfolioRequest extends Request {
  params: {
    id: string;
    item_id: string;
  };
  body: Partial<PortfolioItem>;
}

export interface DeleteCryptoFromPortfolioRequest extends Request {
  params: {
    id: string;
    item_id: string;
  };
}