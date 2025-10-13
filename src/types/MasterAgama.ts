export interface CreateAgamaDto {
    /**
     * Nama agama yang akan dibuat (misalnya: "Islam", "Protestan").
     * Wajib dan harus unik.
     */
    nama_agama: string;
}

export interface AgamaResponseDto {
    id: string;
    nama_agama: string;
    is_active: boolean;
    created_at: Date;
    updated_at: Date;
}

export type AgamaUpdateDto = {
    nama_agama?: string;
    is_active?: boolean;
}

