import { Request } from "express";

export interface AuthenticatedRequest extends Request {
    user: {
        id: number; // or string, depending on your user ID type
        email?: string; // Add other properties as needed
        [key: string]: any;
    };
}