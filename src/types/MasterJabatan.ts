// File: src/types/MasterJabatan.ts

/**
 * Request Model: DTO untuk membuat atau memperbarui Jabatan.
 */
export interface CreateJabatanDto {
    nama_jabatan: string;
    level?: number; // Opsional saat create/update, default di database adalah 99
}

export interface UpdateJabatanDto {
    nama_jabatan?: string; // Opsional saat update
    level?: number; // Opsional saat update
    is_active?: boolean; // Opsional saat update
}
/**
 * Response Model: DTO yang dikirim kembali ke klien.
 */
export interface JabatanResponseDto {
    id: string;
    nama_jabatan: string;
    level: number;
    is_active: boolean;
    created_at: Date;
    updated_at: Date;
}