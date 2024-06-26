/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Photo` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Photo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Photo` ADD COLUMN `slug` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Photo_slug_key` ON `Photo`(`slug`);
