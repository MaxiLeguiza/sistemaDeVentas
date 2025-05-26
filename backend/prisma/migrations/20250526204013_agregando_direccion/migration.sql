/*
  Warnings:

  - Added the required column `direccion` to the `proveedores` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `proveedores` ADD COLUMN `direccion` VARCHAR(191) NOT NULL;
