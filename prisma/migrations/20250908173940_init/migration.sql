-- CreateEnum
CREATE TYPE "public"."Tipo" AS ENUM ('BEBESTIBLE', 'COMESTIBLE');

-- CreateTable
CREATE TABLE "public"."Producto" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "description" TEXT,
    "tipo" "public"."Tipo" NOT NULL DEFAULT 'COMESTIBLE',
    "dueDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Producto_pkey" PRIMARY KEY ("id")
);
