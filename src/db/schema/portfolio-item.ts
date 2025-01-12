import { relations } from "drizzle-orm";
import {
  integer,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import portfolios from "./portfolio";

const portfolioItems = pgTable("portfolio_items", {
  id: uuid("id").primaryKey().defaultRandom(),
  portfolioId: uuid("portfolio_id")
    .references(() => portfolios.id, { onDelete: "cascade" })
    .notNull(),
  cryptoId: varchar("crypto_id", { length: 255 }).notNull(),
  quantity: integer("quantity").notNull(),
  acquisitionCost: integer("acquisition_cost").notNull(),
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
