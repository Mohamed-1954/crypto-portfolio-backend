import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, uniqueIndex, uuid, varchar } from "drizzle-orm/pg-core";
import portfolios from "./portfolio";

const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar("email", { length: 255 }).notNull(),
  password: varchar("password", { length: 255 }).notNull(),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
  refreshToken: text("refresh_token").array().notNull().default([]),
}, (table) => [{
    emailIdx: uniqueIndex("email_idx").on(table.email),
  }]
);

export const userRelations = relations(users, ({ one }) => ({
  portfolio: one(portfolios)
}));

export default users;