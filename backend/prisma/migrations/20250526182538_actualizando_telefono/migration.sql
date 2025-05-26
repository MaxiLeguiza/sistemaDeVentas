/*
  Warnings:

  - You are about to alter the column `telefono` on the `proveedores` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `numero` on the `telefonos_clientes` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `proveedores` MODIFY `telefono` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `telefonos_clientes` MODIFY `numero` INTEGER NOT NULL;
