/*
  Warnings:

  - You are about to drop the column `Title` on the `Expense` table. All the data in the column will be lost.
  - Added the required column `title` to the `Expense` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Category" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."Expense" DROP COLUMN "Title",
ADD COLUMN     "title" TEXT NOT NULL;
