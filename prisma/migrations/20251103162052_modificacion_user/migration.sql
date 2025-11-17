/*
  Warnings:

  - You are about to drop the column `userId` on the `Comanda` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Comanda" DROP CONSTRAINT "Comanda_userId_fkey";

-- DropIndex
DROP INDEX "public"."Comanda_userId_idx";

-- AlterTable
ALTER TABLE "public"."Comanda" DROP COLUMN "userId";
