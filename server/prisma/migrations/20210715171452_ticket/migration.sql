-- CreateTable
CREATE TABLE `ticket` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `createDate` DATE NOT NULL,
    `ticketID` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `ticket.ticketID_unique`(`ticketID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
