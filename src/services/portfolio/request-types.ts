import type { Request } from "express";

export interface GetPortfoliosRequest extends Request {
}

export interface CreatePortfolioRequest extends Request {
  body: {
    name: string;
  };
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
  body: {
    name: string;
  };
}

export interface DeletePortfolioRequest extends Request {
  params: {
    id: string;
  };
}