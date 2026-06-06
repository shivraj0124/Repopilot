-- DropForeignKey
ALTER TABLE `analysis` DROP FOREIGN KEY `Analysis_repositoryId_fkey`;

-- DropForeignKey
ALTER TABLE `repository` DROP FOREIGN KEY `Repository_userId_fkey`;

-- DropIndex
DROP INDEX `Analysis_repositoryId_fkey` ON `analysis`;

-- DropIndex
DROP INDEX `Repository_userId_fkey` ON `repository`;

-- AlterTable
ALTER TABLE `analysis` ADD COLUMN `architecture` TEXT NULL,
    ADD COLUMN `folderExplanation` TEXT NULL,
    ADD COLUMN `techStack` TEXT NULL;

-- AddForeignKey
ALTER TABLE `Repository` ADD CONSTRAINT `Repository_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Analysis` ADD CONSTRAINT `Analysis_repositoryId_fkey` FOREIGN KEY (`repositoryId`) REFERENCES `Repository`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
