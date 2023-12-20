import { sql } from "drizzle-orm"
import {
  decimal,
  pgTable,
  integer,
  json,
  pgEnum,
  primaryKey,
  serial,
  text,
  timestamp,
  varchar,
  smallint,
} from "drizzle-orm/pg-core"

let productsEnum = pgEnum("products_category", ["skateboards",
"clothing",
"shoes",
"accessories",])

export const addresses = pgTable(
  "addresses",
  {
    id: serial("id").notNull(),
    line1: varchar("line1", { length: 191 }),
    line2: varchar("line2", { length: 191 }),
    city: varchar("city", { length: 191 }),
    state: varchar("state", { length: 191 }),
    postalCode: varchar("postalCode", { length: 191 }),
    country: varchar("country", { length: 191 }),
    createdAt: timestamp("createdAt", { mode: "string" }).defaultNow(),
  },
  (table) => {
    return {
      addressesId: primaryKey({ columns: [table.id] }),
    }
  }
)

export const carts = pgTable(
  "carts",
  {
    id: serial("id").notNull(),
    paymentIntentId: varchar("paymentIntentId", { length: 191 }),
    clientSecret: varchar("clientSecret", { length: 191 }),
    items: json("items").default("null"),
    createdAt: timestamp("createdAt", { mode: "string" }).defaultNow(),
    closed: smallint("closed").default(0).notNull(),
  },
  (table) => {
    return {
      cartsId: primaryKey({ columns: [table.id] }),
    }
  }
)

export const emailPreferences = pgTable(
  "email_preferences",
  {
    id: serial("id").notNull(),
    userId: varchar("userId", { length: 191 }),
    email: varchar("email", { length: 191 }).notNull(),
    token: varchar("token", { length: 191 }).notNull(),
    newsletter: smallint("newsletter").default(0).notNull(),
    marketing: smallint("marketing").default(0).notNull(),
    transactional: smallint("transactional").default(0).notNull(),
    createdAt: timestamp("createdAt", { mode: "string" }).defaultNow(),
  },
  (table) => {
    return {
      emailPreferencesId: primaryKey({ columns: [table.id] }),
    }
  }
)

export const orders = pgTable(
  "orders",
  {
    id: serial("id").notNull(),
    storeId: integer("storeId").notNull(),
    items: json("items").default("null"),
    amount: decimal("amount", { precision: 10, scale: 2 })
      .default("0.00")
      .notNull(),
    stripePaymentIntentId: varchar("stripePaymentIntentId", {
      length: 191,
    }).notNull(),
    stripePaymentIntentStatus: varchar("stripePaymentIntentStatus", {
      length: 191,
    }).notNull(),
    name: varchar("name", { length: 191 }),
    email: varchar("email", { length: 191 }),
    addressId: integer("addressId"),
    createdAt: timestamp("createdAt", { mode: "string" }).defaultNow(),
    quantity: integer("quantity"),
  },
  (table) => {
    return {
      ordersId: primaryKey({ columns: [table.id] }),
    }
  }
)

export const payments = pgTable(
  "payments",
  {
    id: serial("id").notNull(),
    storeId: integer("storeId").notNull(),
    stripeAccountId: varchar("stripeAccountId", { length: 191 }).notNull(),
    stripeAccountCreatedAt: integer("stripeAccountCreatedAt"),
    stripeAccountExpiresAt: integer("stripeAccountExpiresAt"),
    detailsSubmitted: smallint("detailsSubmitted").default(0).notNull(),
    createdAt: timestamp("createdAt", { mode: "string" }).defaultNow(),
  },
  (table) => {
    return {
      paymentsId: primaryKey({ columns: [table.id] }),
    }
  }
)

export const products = pgTable(
  "products",
  {
    id: serial("id").notNull(),
    name: varchar("name", { length: 191 }).notNull(),
    description: text("description"),
    images: json("images").default("null"),
    price: decimal("price", { precision: 10, scale: 2 })
      .default("0.00")
      .notNull(),
    inventory: integer("inventory").default(0).notNull(),
    rating: integer("rating").default(0).notNull(),
    storeId: integer("storeId").notNull(),
    createdAt: timestamp("createdAt", { mode: "string" }).defaultNow(),
    tags: json("tags").default("null"),
    category: productsEnum("products_category").notNull(),
    subcategory: varchar("subcategory", { length: 191 }),
  },
  (table) => {
    return {
      productsId: primaryKey({ columns: [table.id] }),
    }
  }
)

export const stores = pgTable(
  "stores",
  {
    id: serial("id").notNull(),
    userId: varchar("userId", { length: 191 }).notNull(),
    name: varchar("name", { length: 191 }).notNull(),
    description: text("description"),
    slug: text("slug"),
    createdAt: timestamp("createdAt", { mode: "string" }).defaultNow(),
    active: smallint("active").default(0).notNull(),
    stripeAccountId: varchar("stripeAccountId", { length: 191 }),
  },
  (table) => {
    return {
      storesId: primaryKey({ columns: [table.id] }),
    }
  }
)

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 191 }).notNull(),
  firstName: varchar("firstName", { length: 191 }),
  lastName: varchar("lastName", { length: 191 }),
  password: varchar("password", { length: 191 }),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").default(sql`now()`),
})
