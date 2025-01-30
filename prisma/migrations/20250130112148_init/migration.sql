-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ldapUserId" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "createdDate" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_ldapUserId_key" ON "User"("ldapUserId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
