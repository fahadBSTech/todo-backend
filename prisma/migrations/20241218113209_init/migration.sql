/*
  Warnings:

  - You are about to drop the column `description` on the `task` table. All the data in the column will be lost.
  - Added the required column `color` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `task` DROP COLUMN `description`,
    ADD COLUMN `color` VARCHAR(191) NOT NULL;
