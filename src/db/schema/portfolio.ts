import { relations } from "drizzle-orm";
import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import portfolioItems from "./portfolio-item";
import users from "./user";

const portfolios = pgTable("portfolios", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

export const portfolioRelations = relations(portfolios, ({ one, many }) => ({
  portfolioItems: many(portfolioItems),
  user: one(users, {
    fields: [portfolios.userId],
    references: [users.id],
  }),
}));

export default portfolios;
