/*
  Warnings:

  - You are about to alter the column `status` on the `issue` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `issue` MODIFY `status` ENUM('Open', 'Closed', 'In_Progress') NOT NULL DEFAULT 'Open';
