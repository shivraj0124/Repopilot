-- CreateTable
CREATE TABLE `IssueAnalysis` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `repositoryId` INTEGER NOT NULL,
    `issueNumber` INTEGER NOT NULL,
    `issueTitle` VARCHAR(191) NOT NULL,
    `problem` TEXT NOT NULL,
    `rootCause` TEXT NOT NULL,
    `difficulty` VARCHAR(191) NOT NULL,
    `estimatedTime` VARCHAR(191) NOT NULL,
    `roadmap` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `IssueAnalysis` ADD CONSTRAINT `IssueAnalysis_repositoryId_fkey` FOREIGN KEY (`repositoryId`) REFERENCES `Repository`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
