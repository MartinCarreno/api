-- CreateTable
CREATE TABLE "public"."Mesa" (
    "id" TEXT NOT NULL,
    "numeroMesa" INTEGER NOT NULL,
    "cuenta" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "comandaId" TEXT NOT NULL,

    CONSTRAINT "Mesa_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Mesa_comandaId_idx" ON "public"."Mesa"("comandaId");

-- AddForeignKey
ALTER TABLE "public"."Mesa" ADD CONSTRAINT "Mesa_comandaId_fkey" FOREIGN KEY ("comandaId") REFERENCES "public"."Comanda"("id") ON DELETE CASCADE ON UPDATE CASCADE;
