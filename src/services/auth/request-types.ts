import type { Request } from "express";

export interface SignUpRequest extends Request {
  body: {
    // requires more attributes later
    email: string;
    password: string;
  };
}

export interface SignInRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}