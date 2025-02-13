/*
  Warnings:

  - Added the required column `requirement` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `skill` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Job` ADD COLUMN `requirement` TEXT NOT NULL,
    ADD COLUMN `skill` TEXT NOT NULL;
