-- CreateTable
CREATE TABLE "master_pendidikan" (
    "id" TEXT NOT NULL,
    "nama_pendidikan" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "master_pendidikan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "master_pendidikan_nama_pendidikan_key" ON "master_pendidikan"("nama_pendidikan");
