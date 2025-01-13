import { portfolioItems } from "@/db/schema";
import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
import type { z } from "zod";

export const insertPortfolioItemSchema = createInsertSchema(portfolioItems);
export const updatePortfolioItemSchema = createUpdateSchema(
  portfolioItems
).refine((object: Record<string, unknown>) => Object.keys(object).length > 0, {
  message: "At least one field is required to update a portfolio item",
});

export type InsertPortfolioItemSchema = z.infer<
  typeof insertPortfolioItemSchema
>;
export type UpdatePortfolioItemSchema = z.infer<
  typeof updatePortfolioItemSchema
>;
