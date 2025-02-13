/*
  Warnings:

  - Added the required column `responsibility` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Job` ADD COLUMN `responsibility` TEXT NOT NULL;
