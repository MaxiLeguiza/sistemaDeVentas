/*
  Warnings:

  - You are about to alter the column `numero` on the `clientes` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `clientes` MODIFY `numero` INTEGER NOT NULL;
