import { relations } from "drizzle-orm";
import {
  integer,
  pgTable,
  real,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import portfolios from "./portfolio";

const portfolioItems = pgTable("portfolio_items", {
  id: uuid("id").primaryKey().defaultRandom(),
  portfolioId: uuid("portfolio_id")
    .references(() => portfolios.id, { onDelete: "cascade" })
    .notNull(),
  cryptoId: integer("crypto_id").notNull(),
  quantity: integer("quantity").notNull(),
  acquisitionCost: real("acquisition_cost").notNull(),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

export const portfolioItemRelations = relations(portfolioItems, ({ one }) => ({
  portfolio: one(portfolios, {
    fields: [portfolioItems.portfolioId],
    references: [portfolios.id],
  }),
}));

export default portfolioItems;
