/*
  Warnings:

  - You are about to drop the column `nombre` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "nombre",
ADD COLUMN     "name" TEXT;
