-- CreateTable
CREATE TABLE `Admin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `login` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Admin_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Booking` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `checkIn` VARCHAR(191) NOT NULL,
    `checkOut` VARCHAR(191) NOT NULL,
    `responsibleName` VARCHAR(191) NOT NULL,
    `responsibleCpf` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `adultsNumbers` VARCHAR(191) NOT NULL,
    `childNumbers` VARCHAR(191) NOT NULL,
    `bookingValue` DOUBLE NOT NULL,
    `statusBooking` VARCHAR(191) NOT NULL,
    `protocol` INTEGER NOT NULL,
    `pet` BOOLEAN NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `cottageId` INTEGER NOT NULL,

    UNIQUE INDEX `Booking_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cottage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `photo` VARCHAR(191) NULL,
    `capacity` INTEGER NOT NULL,
    `amount` INTEGER NOT NULL,
    `overnightWeek` DOUBLE NOT NULL,
    `overnightWeekend` DOUBLE NOT NULL,

    UNIQUE INDEX `Cottage_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_cottageId_fkey` FOREIGN KEY (`cottageId`) REFERENCES `Cottage`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
