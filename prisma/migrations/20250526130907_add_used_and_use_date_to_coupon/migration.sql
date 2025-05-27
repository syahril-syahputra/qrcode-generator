-- AlterTable
ALTER TABLE "coupon" ADD COLUMN     "useDate" TIMESTAMP(3),
ADD COLUMN     "used" BOOLEAN NOT NULL DEFAULT false;
