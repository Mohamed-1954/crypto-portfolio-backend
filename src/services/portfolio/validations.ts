import { portfolios } from "@/db/schema";
import { createInsertSchema, createSelectSchema, createUpdateSchema } from "drizzle-zod";
import type { z } from "zod";

export const selectPortfolioSchema = createSelectSchema(portfolios);
export const insertPortfolioSchema = createInsertSchema(portfolios);
export const updatePortfolioSchema = createUpdateSchema(portfolios).refine((object: Record<string, unknown>) => Object.keys(object).length > 0, {
  message: "At least one field is required to update a portfolio item",
});

export type SelectPortfolioSchema = z.infer<typeof selectPortfolioSchema>;
export type InsertPortfolioSchema = z.infer<typeof insertPortfolioSchema>;
export type UpdatePortfolioSchema = z.infer<typeof updatePortfolioSchema>;
