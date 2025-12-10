/*
  Warnings:

  - You are about to drop the column `activo` on the `Comanda` table. All the data in the column will be lost.
  - You are about to drop the column `precio` on the `ComandaDetalle` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Producto` table. All the data in the column will be lost.
  - You are about to drop the `ComandaTotal` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `Comanda` table without a default value. This is not possible if the table is not empty.
  - Added the required column `precio` to the `Producto` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."ComandaEstado" AS ENUM ('PENDIENTE', 'EN_PREPARACION', 'ENTREGADO', 'PAGADO');

-- DropForeignKey
ALTER TABLE "public"."ComandaTotal" DROP CONSTRAINT "ComandaTotal_comandaId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Producto" DROP CONSTRAINT "Producto_userId_fkey";

-- DropIndex
DROP INDEX "public"."Comanda_mesaId_key";

-- AlterTable
ALTER TABLE "public"."Comanda" DROP COLUMN "activo",
ADD COLUMN     "estado" "public"."ComandaEstado" NOT NULL DEFAULT 'PENDIENTE',
ADD COLUMN     "total" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."ComandaDetalle" DROP COLUMN "precio",
ADD COLUMN     "precioUnitario" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "public"."Producto" DROP COLUMN "userId",
ADD COLUMN     "activo" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "precio" DOUBLE PRECISION NOT NULL;

-- DropTable
DROP TABLE "public"."ComandaTotal";

-- AddForeignKey
ALTER TABLE "public"."Comanda" ADD CONSTRAINT "Comanda_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
