import { portfolios } from "@/db/schema";
import { createInsertSchema, createSelectSchema, createUpdateSchema } from "drizzle-zod";
import { z } from "zod";

export const selectPortfolioSchema = createSelectSchema(portfolios);
export const insertPortfolioSchema = createInsertSchema(portfolios);
export const updatePortfolioSchema = createUpdateSchema(portfolios).required({
  id: true,
  name: true,
  userId:true
});

export type SelectPortfolioSchema = z.infer<typeof selectPortfolioSchema>;
export type InsertPortfolioSchema = z.infer<typeof insertPortfolioSchema>;
export type UpdatePortfolioSchema = z.infer<typeof updatePortfolioSchema>;
