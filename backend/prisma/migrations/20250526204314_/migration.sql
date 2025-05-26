/*
  Warnings:

  - You are about to drop the column `email` on the `proveedores` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `proveedores_email_key` ON `proveedores`;

-- AlterTable
ALTER TABLE `proveedores` DROP COLUMN `email`;
