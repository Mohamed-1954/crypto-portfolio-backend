import { relations } from "drizzle-orm";
import { integer, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import portfolio from "./portfolio";

const portfolioItem = pgTable("portfolio_items", {
  id: uuid("id").primaryKey().defaultRandom(),
  portfolioId: integer("portfolio_id").references(() => portfolio.id, {onDelete: "cascade"}),
  cryptoId: varchar("crypto_id", { length: 255 }).notNull().unique(),
  quantity: integer("quantity").notNull(),
  acquisitionCost: integer("acquisition_cost").notNull(),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

export const portfolioItemRelations = relations(portfolioItem, ({ one }) => ({
  portfolio: one(portfolio, {
    fields: [portfolioItem.portfolioId],
    references: [portfolio.id]
  }),
}))

export default portfolioItem;