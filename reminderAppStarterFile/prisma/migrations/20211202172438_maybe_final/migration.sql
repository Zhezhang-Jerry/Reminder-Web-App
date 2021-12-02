/*
  Warnings:

  - You are about to drop the column `complete` on the `reminders` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_reminders" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userID" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "reminders_userID_fkey" FOREIGN KEY ("userID") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_reminders" ("description", "id", "title", "userID") SELECT "description", "id", "title", "userID" FROM "reminders";
DROP TABLE "reminders";
ALTER TABLE "new_reminders" RENAME TO "reminders";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
