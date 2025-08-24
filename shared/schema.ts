import { sql } from "drizzle-orm";
import { pgTable, text, varchar, bigint, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table remains the same
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});


// Updated claims table
export const claims = pgTable("claims", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull(),
  orderId: text("order_id").notNull(),
  robloxUsername: text("roblox_username").notNull(),
  robloxUserId: bigint("roblox_user_id", { mode: "number" }).notNull(),
  avatarUrl: text("avatar_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Zod schema for insert
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Custom email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const insertClaimSchema = createInsertSchema(claims).pick({
  email: true,
  orderId: true,
  robloxUsername: true,
  robloxUserId: true,
  avatarUrl: true,
});

export const claimFormSchema = z.object({
  contactAddress: z.string().min(1, "Email is required").refine((email) => emailRegex.test(email), {
    message: "Please enter a valid email address",
  }),
  orderId: z.string().min(1, "Order ID is required"),
  robloxUsername: z.string().min(1, "Roblox username is required").max(20, "Username must be 20 characters or less"),
  confirmRobloxUsername: z.string().min(1, "Please confirm your Roblox username"),
}).refine((data) => data.robloxUsername === data.confirmRobloxUsername, {
  message: "Roblox usernames must match",
  path: ["confirmRobloxUsername"],
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertClaim = z.infer<typeof insertClaimSchema>;
export type Claim = typeof claims.$inferSelect;
export type ClaimFormData = z.infer<typeof claimFormSchema>;
