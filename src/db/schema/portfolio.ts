import { relations } from "drizzle-orm";
import {
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import portfolioItem from "./portfolio-item";
import user from "./user";

const portfolio = pgTable("portfolio", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => user.id, {onDelete: "cascade"}),
  name: varchar("name", { length: 255 }).notNull(),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

export const portfolioRelations = relations(portfolio, ({ one, many }) => ({
  portfolioItems: many(portfolioItem),
  user: one(user, {
    fields: [portfolio.userId],
    references: [user.id],
  }),
}));

export default portfolio;
