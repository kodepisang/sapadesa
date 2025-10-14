-- CreateTable
CREATE TABLE "master_klasifikasi_desa" (
    "id" TEXT NOT NULL,
    "nama_klasifikasi" TEXT NOT NULL,
    "deskripsi" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "master_klasifikasi_desa_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "master_klasifikasi_desa_nama_klasifikasi_key" ON "master_klasifikasi_desa"("nama_klasifikasi");
