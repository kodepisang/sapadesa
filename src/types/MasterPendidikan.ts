// File: src/types/MasterPendidikan.ts

/**
 * Request Model: DTO untuk membuat atau memperbarui Pendidikan.
 */
export interface CreatePendidikanDto {
    nama_pendidikan: string;
}

export interface UpdatePendidikanDto {
    nama_pendidikan?: string; // Opsional saat update
    is_active?: boolean; // Opsional saat update
}
/**
 * Response Model: DTO yang dikirim kembali ke klien.
 */
export interface PendidikanResponseDto {
    id: string;
    nama_pendidikan: string;
    is_active: boolean;
    created_at: Date;
    updated_at: Date;
}