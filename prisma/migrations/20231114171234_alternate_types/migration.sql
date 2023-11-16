/*
  Warnings:

  - You are about to alter the column `adultsNumbers` on the `booking` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `childNumbers` on the `booking` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `booking` MODIFY `adultsNumbers` INTEGER NOT NULL,
    MODIFY `childNumbers` INTEGER NOT NULL;
