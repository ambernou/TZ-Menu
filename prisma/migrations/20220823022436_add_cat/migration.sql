/*
  Warnings:

  - You are about to drop the `_CategoryToDish` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `catId` to the `Dish` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_CategoryToDish" DROP CONSTRAINT "_CategoryToDish_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToDish" DROP CONSTRAINT "_CategoryToDish_B_fkey";

-- AlterTable
ALTER TABLE "Dish" ADD COLUMN     "catId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_CategoryToDish";

-- AddForeignKey
ALTER TABLE "Dish" ADD CONSTRAINT "Dish_catId_fkey" FOREIGN KEY ("catId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
