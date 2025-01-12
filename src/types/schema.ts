import type { users, portfolios, portfolioItems } from "@/db/schema";
import type { InferSelectModel } from "drizzle-orm";

export type User = InferSelectModel<typeof users>;
export type Portfolio = InferSelectModel<typeof portfolios>;
export type PortfolioItem = InferSelectModel<typeof portfolioItems>;