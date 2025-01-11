import { relations } from "drizzle-orm";
import { pgTable, timestamp, uniqueIndex, uuid, varchar } from "drizzle-orm/pg-core";
import portfolio from "./portfolio";

const user = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
}, (table) => {
  return {
    emailIdx: uniqueIndex("email_idx").on(table.email),
  }}
);

export const userRelations = relations(user, ({ one }) => ({
  portfolio: one(portfolio)
}))

export default user;