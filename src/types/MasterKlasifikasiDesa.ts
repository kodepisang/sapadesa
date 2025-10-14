export interface CreateKlasifikasiDesaDto {
    /**
     * Nama Klasifikasi (misal: 'Desa Mandiri', 'Desa Maju', 'Desa Berkembang')
     * Wajib dan harus unik.
     */
    nama_klasifikasi: string;
    deskripsi?: string;
}

export interface KlasifikasiDesaResponseDto {
    id: string;
    nama_klasifikasi: string;
    deskripsi: string;
    is_active: boolean;
    created_at: Date;
    updated_at: Date;
}

export type KlasifikasiDesaUpdateDto = {
    nama_klasifikasi?: string;
    is_active?: boolean;
    deskripsi?: string;
}

