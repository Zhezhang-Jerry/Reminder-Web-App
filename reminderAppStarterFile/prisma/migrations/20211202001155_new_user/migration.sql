-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "password" TEXT,
    "role" TEXT NOT NULL DEFAULT 'user',
    "picture" TEXT NOT NULL
);
INSERT INTO "new_users" ("email", "id", "name", "password", "picture", "role") SELECT "email", "id", "name", "password", "picture", "role" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
