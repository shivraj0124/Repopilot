-- CreateTable
CREATE TABLE `Repository` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `owner` VARCHAR(191) NOT NULL,
    `repoName` VARCHAR(191) NOT NULL,
    `repoUrl` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Analysis` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `repositoryId` INTEGER NOT NULL,
    `summary` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Repository` ADD CONSTRAINT `Repository_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Analysis` ADD CONSTRAINT `Analysis_repositoryId_fkey` FOREIGN KEY (`repositoryId`) REFERENCES `Repository`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
