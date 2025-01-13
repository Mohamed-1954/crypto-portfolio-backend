import type { Portfolio } from "@/types/schema";
import type { Request } from "express";

export interface GetPortfoliosRequest extends Request {
}

export interface CreatePortfolioRequest extends Request {
  body: Portfolio;
}

export interface GetPortfolioByIdRequest extends Request {
  params: {
    id: string;
  };
}

export interface UpdatePortfolioRequest extends Request {
  params: {
    id: string;
  };
  body: Partial<Portfolio>;
}

export interface DeletePortfolioRequest extends Request {
  params: {
    id: string;
  };
}