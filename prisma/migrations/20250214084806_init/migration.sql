/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Job` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `dataCount` to the `Log` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Log" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "job" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "dataCount" INTEGER NOT NULL,
    "time" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Log" ("createdAt", "id", "job", "message", "time", "updatedAt") SELECT "createdAt", "id", "job", "message", "time", "updatedAt" FROM "Log";
DROP TABLE "Log";
ALTER TABLE "new_Log" RENAME TO "Log";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Job_name_key" ON "Job"("name");
