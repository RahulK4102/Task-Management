/*
  Warnings:

  - You are about to alter the column `status` on the `issue` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `TinyInt`.

*/
-- AlterTable
ALTER TABLE `issue` MODIFY `status` BOOLEAN NOT NULL DEFAULT true;
