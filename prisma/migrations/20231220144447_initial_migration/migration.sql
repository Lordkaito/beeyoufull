-- CreateEnum
CREATE TYPE "enum_category" AS ENUM ('ACCESSORIES', 'ART', 'BABY', 'BEAUTY', 'BOOKS', 'CLOTHING', 'ELECTRONICS', 'FOOD', 'GARDEN', 'HEALTH', 'HOME', 'JEWELRY', 'MUSIC', 'OFFICE', 'OUTDOORS', 'PETS', 'SPORTS', 'TOYS', 'VEHICLES', 'OTHER');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" VARCHAR(191),
    "lastName" VARCHAR(191),
    "password" VARCHAR(191) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "addresses" (
    "id" SERIAL NOT NULL,
    "line1" VARCHAR(191),
    "line2" VARCHAR(191),
    "city" VARCHAR(191),
    "state" VARCHAR(191),
    "postalCode" VARCHAR(191),
    "country" VARCHAR(191),
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "addresses_id_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "carts" (
    "id" SERIAL NOT NULL,
    "paymentIntentId" VARCHAR(191),
    "clientSecret" VARCHAR(191),
    "items" JSON DEFAULT 'null',
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "closed" SMALLINT NOT NULL DEFAULT 0,

    CONSTRAINT "carts_id_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "email_preferences" (
    "id" SERIAL NOT NULL,
    "userId" VARCHAR(191),
    "email" VARCHAR(191) NOT NULL,
    "token" VARCHAR(191) NOT NULL,
    "newsletter" SMALLINT NOT NULL DEFAULT 0,
    "marketing" SMALLINT NOT NULL DEFAULT 0,
    "transactional" SMALLINT NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "email_preferences_id_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" SERIAL NOT NULL,
    "storeId" INTEGER NOT NULL,
    "items" JSON DEFAULT 'null',
    "amount" DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    "stripePaymentIntentId" VARCHAR(191) NOT NULL,
    "stripePaymentIntentStatus" VARCHAR(191) NOT NULL,
    "name" VARCHAR(191),
    "email" VARCHAR(191),
    "addressId" INTEGER,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "quantity" INTEGER,

    CONSTRAINT "orders_id_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payments" (
    "id" SERIAL NOT NULL,
    "storeId" INTEGER NOT NULL,
    "stripeAccountId" VARCHAR(191) NOT NULL,
    "stripeAccountCreatedAt" INTEGER,
    "stripeAccountExpiresAt" INTEGER,
    "detailsSubmitted" SMALLINT NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payments_id_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(191) NOT NULL,
    "description" VARCHAR(191),
    "images" JSON DEFAULT 'null',
    "price" DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    "inentory" INTEGER NOT NULL DEFAULT 0,
    "storeId" INTEGER NOT NULL,
    "tags" JSON DEFAULT 'null',
    "category" "enum_category" NOT NULL DEFAULT 'OTHER',
    "subcategory" VARCHAR(191),
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "products_id_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stores" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "name" VARCHAR(191) NOT NULL,
    "description" VARCHAR(191),
    "slug" VARCHAR(191),
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "active" SMALLINT NOT NULL DEFAULT 0,
    "stripeAccountId" VARCHAR(191),

    CONSTRAINT "stores_id_pk" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
