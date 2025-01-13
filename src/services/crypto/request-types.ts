import type { Request } from "express";

export interface GetCryptoByIdRequest extends Request {
  params: {
    id: string;
  };
}