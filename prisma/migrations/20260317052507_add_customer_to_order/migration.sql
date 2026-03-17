/*
  Warnings:

  - Added the required column `customerCpf` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerName` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "OrderStatus" ADD VALUE 'PAYMENT_CONFIRMED';
ALTER TYPE "OrderStatus" ADD VALUE 'PAYMENT_FAILED';

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "customerCpf" TEXT NOT NULL,
ADD COLUMN     "customerName" TEXT NOT NULL;
