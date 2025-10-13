/*
  Warnings:

  - Added the required column `comandaId` to the `Producto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Producto" ADD COLUMN     "comandaId" TEXT NOT NULL,
ALTER COLUMN "nombre" DROP NOT NULL;

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "nombre" TEXT,
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Comanda" (
    "id" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Comanda_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE INDEX "Producto_comandaId_idx" ON "public"."Producto"("comandaId");

-- AddForeignKey
ALTER TABLE "public"."Producto" ADD CONSTRAINT "Producto_comandaId_fkey" FOREIGN KEY ("comandaId") REFERENCES "public"."Comanda"("id") ON DELETE CASCADE ON UPDATE CASCADE;
