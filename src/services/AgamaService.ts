// File: src/services/AgamaService.ts

import {PrismaClient, Prisma, type Agama} from '@prisma/client';
import type {AgamaResponseDto} from "../types/MasterAgama.js";
import {paginate, type PaginatedResult} from "../utilities/pagination.js";

const prisma = new PrismaClient();

/**
 * Fungsi Mapper: Mengubah objek model Prisma.Agama menjadi AgamaResponseDto.
 * Ini memastikan hanya field yang aman dan relevan yang dikirim ke klien.
 */
function mapToAgamaResponse(agama: Agama): AgamaResponseDto {
    return {
        id: agama.id,
        nama_agama: agama.nama_agama,
        is_active: agama.is_active,
        created_at: agama.created_at,
        updated_at: agama.updated_at,
        // Jika ada field sensitif (misal 'password' di model lain), tidak disertakan di sini.
    };
}

// Tipe Data untuk input (Create)
type AgamaCreateInput = Prisma.AgamaCreateInput;

/**
 * C - Create: Membuat data Agama baru
 */
export async function createAgama(data: AgamaCreateInput) {
    return prisma.agama.create({ data });
}

/**
 * R - Read All: Mengambil semua data Agama
 */
/**
 * R - Read All: Mengambil data Agama dengan Pagination
 * @param page Halaman yang diminta (default 1)
 * @param limit Batas data (default 10)
 * @param order Urutan data ('asc' atau 'desc')
 * @param orderByField Field yang digunakan untuk mengurutkan
 */
export async function getAllAgama(
    page: number = 1,
    limit: number = 10, // Parameter baru
    order: "asc" | "desc" = 'asc', // Parameter baru
    orderByField?: string, // Parameter baru
): Promise<PaginatedResult<AgamaResponseDto>> {

    // 1. Buat objek ORDER BY untuk Prisma
    // Pastikan field yang diminta valid
    const orderBy: any = {};
    if (orderByField && ['id', 'nama_agama', 'created_at'].includes(orderByField as string)) {
        orderBy[orderByField] = order;
    } else {
        orderBy['nama_agama'] = 'asc'; // Fallback
    }

    // 2. Argumen khusus untuk kueri Prisma (filter aktif)
    const findManyArgs = {
        where: { is_active: true },
    };

    // 3. Panggil fungsi paginate generik
    const paginatedResult = await paginate(
        prisma.agama,
        page,
        limit, // Kirim limit
        orderBy, // Kirim orderBy
        findManyArgs
    );

    // 4. Lakukan mapping dan kembalikan hasil
    const dataResponse = paginatedResult.data.map(mapToAgamaResponse);

    return {
        ...paginatedResult,
        data: dataResponse,
    };
}

/**
 * R - Read One: Mengambil satu data Agama berdasarkan ID
 */
export async function getAgamaById(id: string) {
    return prisma.agama.findUnique({
        where: { id },
    });
}

/**
 * U - Update: Memperbarui data Agama
 */
export async function updateAgama(id: string, data: Prisma.AgamaUpdateInput) {
    return prisma.agama.update({
        where: { id },
        data,
    });
}

/**
 * D - Delete (Soft Delete): Menonaktifkan data Agama
 */
export async function deleteAgama(id: string) {
    // Lebih aman menggunakan soft delete (mengubah is_active menjadi false)
    return prisma.agama.update({
        where: { id },
        data: { is_active: false },
    });
}