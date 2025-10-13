-- CreateTable
CREATE TABLE "master_jabatan" (
    "id" TEXT NOT NULL,
    "nama_jabatan" TEXT NOT NULL,
    "level" INTEGER NOT NULL DEFAULT 99,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "master_jabatan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "master_jabatan_nama_jabatan_key" ON "master_jabatan"("nama_jabatan");
