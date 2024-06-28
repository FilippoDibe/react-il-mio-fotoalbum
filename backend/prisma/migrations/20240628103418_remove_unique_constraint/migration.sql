-- DropIndex
DROP INDEX `Message_senderMail_key` ON `Message`;

-- AlterTable
ALTER TABLE `Photo` MODIFY `description` TEXT NOT NULL;
