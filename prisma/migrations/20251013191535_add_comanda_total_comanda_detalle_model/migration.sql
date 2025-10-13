/*
  Warnings:

  - You are about to drop the column `comandaId` on the `Mesa` table. All the data in the column will be lost.
  - You are about to drop the column `cuenta` on the `Mesa` table. All the data in the column will be lost.
  - You are about to drop the column `comandaId` on the `Producto` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[mesaId]` on the table `Comanda` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[numeroMesa]` on the table `Mesa` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `mesaId` to the `Comanda` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Mesa" DROP CONSTRAINT "Mesa_comandaId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Producto" DROP CONSTRAINT "Producto_comandaId_fkey";

-- DropIndex
DROP INDEX "public"."Mesa_comandaId_idx";

-- DropIndex
DROP INDEX "public"."Producto_comandaId_idx";

-- AlterTable
ALTER TABLE "public"."Comanda" ADD COLUMN     "activo" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "mesaId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Mesa" DROP COLUMN "comandaId",
DROP COLUMN "cuenta";

-- AlterTable
ALTER TABLE "public"."Producto" DROP COLUMN "comandaId";

-- CreateTable
CREATE TABLE "public"."ComandaDetalle" (
    "id" TEXT NOT NULL,
    "comandaId" TEXT NOT NULL,
    "productoId" TEXT NOT NULL,
    "cantidad" INTEGER NOT NULL DEFAULT 1,
    "precio" DOUBLE PRECISION,
    "observacion" TEXT,

    CONSTRAINT "ComandaDetalle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ComandaTotal" (
    "id" TEXT NOT NULL,
    "comandaId" TEXT NOT NULL,
    "total" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ComandaTotal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ComandaTotal_comandaId_key" ON "public"."ComandaTotal"("comandaId");

-- CreateIndex
CREATE UNIQUE INDEX "Comanda_mesaId_key" ON "public"."Comanda"("mesaId");

-- CreateIndex
CREATE UNIQUE INDEX "Mesa_numeroMesa_key" ON "public"."Mesa"("numeroMesa");

-- AddForeignKey
ALTER TABLE "public"."Comanda" ADD CONSTRAINT "Comanda_mesaId_fkey" FOREIGN KEY ("mesaId") REFERENCES "public"."Mesa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ComandaDetalle" ADD CONSTRAINT "ComandaDetalle_comandaId_fkey" FOREIGN KEY ("comandaId") REFERENCES "public"."Comanda"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ComandaDetalle" ADD CONSTRAINT "ComandaDetalle_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "public"."Producto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ComandaTotal" ADD CONSTRAINT "ComandaTotal_comandaId_fkey" FOREIGN KEY ("comandaId") REFERENCES "public"."Comanda"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
