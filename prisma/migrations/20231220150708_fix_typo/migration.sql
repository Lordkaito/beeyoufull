/*
  Warnings:

  - You are about to drop the column `inentory` on the `products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "products" DROP COLUMN "inentory",
ADD COLUMN     "inventory" INTEGER NOT NULL DEFAULT 0;
