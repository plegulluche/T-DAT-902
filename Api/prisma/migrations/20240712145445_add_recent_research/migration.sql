-- CreateTable
CREATE TABLE "RecentResearch" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,
    "roomMin" INTEGER NOT NULL,
    "roomMax" INTEGER NOT NULL,
    "priceMin" INTEGER NOT NULL,
    "priceMax" INTEGER NOT NULL,
    "department" INTEGER NOT NULL,

    CONSTRAINT "RecentResearch_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RecentResearch" ADD CONSTRAINT "RecentResearch_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
