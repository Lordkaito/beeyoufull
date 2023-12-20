import type { CartItem, CheckoutItem, StoredFile } from "@/types"
import { relations, sql } from "drizzle-orm"
import {
  boolean,
  decimal,
  integer,
  json,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core"

export const stores = pgTable("stores", {
  id: serial("id").primaryKey(),
  userId: varchar("userId", { length: 191 }).notNull(),
  name: varchar("name", { length: 191 }).notNull(),
  description: text("description"),
  slug: text("slug"),
  active: boolean("active").notNull().default(false),
  stripeAccountId: varchar("stripeAccountId", { length: 191 }),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").default(sql`now()`),
})

export type Store = typeof stores.$inferSelect
export type NewStore = typeof stores.$inferInsert

export const storesRelations = relations(stores, ({ many }) => ({
  products: many(products),
  payments: many(payments),
}))

export const categoriesEnum = pgEnum("categories", [
  "skateboards",
  "clothing",
  "shoes",
  "accessories",
])

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 191 }).notNull(),
  description: text("description"),
  images: json("images").$type<StoredFile[] | null>().default(null),
  category: categoriesEnum("category").notNull(),
  subcategory: varchar("subcategory", { length: 191 }),
  price: decimal("price", { precision: 10, scale: 2 }).notNull().default("0"),
  inventory: integer("inventory").notNull().default(0),
  rating: integer("rating").notNull().default(0),
  tags: json("tags").$type<string[] | null>().default(null),
  storeId: integer("storeId").notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").default(sql`now()`),
})

export type Product = typeof products.$inferSelect
export type NewProduct = typeof products.$inferInsert

export const productsRelations = relations(products, ({ one }) => ({
  store: one(stores, { fields: [products.storeId], references: [stores.id] }),
}))

// Original source: https://github.com/jackblatch/OneStopShop/blob/main/db/schema.ts
export const carts = pgTable("carts", {
  id: serial("id").primaryKey(),
  paymentIntentId: varchar("paymentIntentId", { length: 191 }),
  clientSecret: varchar("clientSecret", { length: 191 }),
  items: json("items").$type<CartItem[] | null>().default(null),
  closed: boolean("closed").notNull().default(false),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").default(sql`now()`),
})

export type Cart = typeof carts.$inferSelect
export type NewCart = typeof carts.$inferInsert

export const emailPreferences = pgTable("email_preferences", {
  id: serial("id").primaryKey(),
  userId: varchar("userId", { length: 191 }),
  email: varchar("email", { length: 191 }).notNull(),
  token: varchar("token", { length: 191 }).notNull(),
  newsletter: boolean("newsletter").notNull().default(false),
  marketing: boolean("marketing").notNull().default(false),
  transactional: boolean("transactional").notNull().default(false),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").default(sql`now()`),
})

export type EmailPreference = typeof emailPreferences.$inferSelect
export type NewEmailPreference = typeof emailPreferences.$inferInsert

// Original source: https://github.com/jackblatch/OneStopShop/blob/main/db/schema.ts
export const payments = pgTable("payments", {
  id: serial("id").primaryKey(),
  storeId: integer("storeId").notNull(),
  stripeAccountId: varchar("stripeAccountId", { length: 191 }).notNull(),
  stripeAccountCreatedAt: integer("stripeAccountCreatedAt"),
  stripeAccountExpiresAt: integer("stripeAccountExpiresAt"),
  detailsSubmitted: boolean("detailsSubmitted").notNull().default(false),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").default(sql`now()`),
})

export type Payment = typeof payments.$inferSelect
export type NewPayment = typeof payments.$inferInsert

export const paymentsRelations = relations(payments, ({ one }) => ({
  store: one(stores, { fields: [payments.storeId], references: [stores.id] }),
}))

// Original source: https://github.com/jackblatch/OneStopShop/blob/main/db/schema.ts
export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  storeId: integer("storeId").notNull(),
  items: json("items").$type<CheckoutItem[] | null>().default(null),
  quantity: integer("quantity"),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull().default("0"),
  stripePaymentIntentId: varchar("stripePaymentIntentId", {
    length: 191,
  }).notNull(),
  stripePaymentIntentStatus: varchar("stripePaymentIntentStatus", {
    length: 191,
  }).notNull(),
  name: varchar("name", { length: 191 }),
  email: varchar("email", { length: 191 }),
  addressId: integer("addressId"),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").default(sql`now()`),
})

export type Order = typeof orders.$inferSelect
export type NewOrder = typeof orders.$inferInsert

// Original source: https://github.com/jackblatch/OneStopShop/blob/main/db/schema.ts
export const addresses = pgTable("addresses", {
  id: serial("id").primaryKey(),
  line1: varchar("line1", { length: 191 }),
  line2: varchar("line2", { length: 191 }),
  city: varchar("city", { length: 191 }),
  state: varchar("state", { length: 191 }),
  postalCode: varchar("postalCode", { length: 191 }),
  country: varchar("country", { length: 191 }),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").default(sql`now()`),
})

export type Address = typeof addresses.$inferSelect
export type NewAddress = typeof addresses.$inferInsert
