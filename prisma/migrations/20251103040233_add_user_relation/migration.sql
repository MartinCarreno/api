/*
  Warnings:

  - Added the required column `userId` to the `Comanda` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comanda" ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Comanda_userId_idx" ON "Comanda"("userId");

-- AddForeignKey
ALTER TABLE "Comanda" ADD CONSTRAINT "Comanda_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
