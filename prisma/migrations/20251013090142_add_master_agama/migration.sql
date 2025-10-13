-- CreateTable
CREATE TABLE "master_agama" (
    "id" TEXT NOT NULL,
    "nama_agama" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "master_agama_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "master_agama_nama_agama_key" ON "master_agama"("nama_agama");
