-- CreateTable
CREATE TABLE "Photos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "albumId" INTEGER NOT NULL,
    "title" TEXT,
    "url" TEXT NOT NULL,
    "thumbnailUrl" TEXT NOT NULL
);
