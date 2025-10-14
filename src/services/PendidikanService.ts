// File: src/services/pendidikanService.ts

import {PrismaClient, Prisma, type Pendidikan} from '@prisma/client';

import {paginate, type PaginatedResult} from "../utilities/pagination.js";
import type {CreatePendidikanDto, PendidikanResponseDto} from "../types/MasterPendidikan.js";

const prisma = new PrismaClient();

/**
 * Fungsi Mapper: Mengubah objek model Prisma.pendidikan menjadi pendidikanResponseDto.
 * Ini memastikan hanya field yang aman dan relevan yang dikirim ke klien.
 */
function mapToPendidikanResponse(pendidikan: Pendidikan): PendidikanResponseDto {
    return {
        id: pendidikan.id,
        nama_pendidikan: pendidikan.nama_pendidikan,
        is_active: pendidikan.is_active,
        created_at: pendidikan.created_at,
        updated_at: pendidikan.updated_at,
        // Jika ada field sensitif (misal 'password' di model lain), tidak disertakan di sini.
    };
}

// Tipe Data untuk input (Create)
// type pendidikanCreateInput = Prisma.pendidikanCreateInput;

/**
 * C - Create: Membuat data pendidikan baru
 */
export async function createPendidikan(data: CreatePendidikanDto) {
    return prisma.pendidikan.create({ data });
}

/**
 * R - Read All: Mengambil semua data pendidikan
 */
/**
 * R - Read All: Mengambil data pendidikan dengan Pagination
 * @param page Halaman yang diminta (default 1)
 * @param limit Batas data (default 10)
 * @param order Urutan data ('asc' atau 'desc')
 * @param orderByField Field yang digunakan untuk mengurutkan
 */
export async function getAllPendidikan(
    page: number = 1,
    limit: number = 10, // Parameter baru
    order: "asc" | "desc" = 'asc', // Parameter baru
    orderByField?: string, // Parameter baru
): Promise<PaginatedResult<PendidikanResponseDto>> {

    // 1. Buat objek ORDER BY untuk Prisma
    // Pastikan field yang diminta valid
    const orderBy: any = {};
    if (orderByField && ['id', 'nama_pendidikan', 'created_at', 'updated_at'].includes(orderByField as string)) {
        orderBy[orderByField] = order;
    } else {
        orderBy['updated_at'] = 'desc'; // Fallback
    }

    // 2. Argumen khusus untuk kueri Prisma (filter aktif)
    const findManyArgs = {
        where: orderByField ? { is_active: true } : {},
    };

    // 3. Panggil fungsi paginate generik
    const paginatedResult = await paginate(
        prisma.pendidikan,
        page,
        limit, // Kirim limit
        orderBy, // Kirim orderBy
        findManyArgs
    );

    // 4. Lakukan mapping dan kembalikan hasil
    const dataResponse = paginatedResult.data.map(mapToPendidikanResponse);

    return {
        ...paginatedResult,
        data: dataResponse,
    };
}

/**
 * R - Read One: Mengambil satu data pendidikan berdasarkan ID
 */
export async function getPendidikanById(id: string) {
    return prisma.pendidikan.findUnique({
        where: { id },
    });
}

/**
 * U - Update: Memperbarui data pendidikan
 */
export async function updatePendidikan(id: string, data: Prisma.PendidikanUpdateInput) {
    return prisma.pendidikan.update({
        where: { id },
        data,
    });
}

/**
 * D - Delete (Soft Delete): Menonaktifkan data pendidikan
 */
export async function deletependidikan(id: string) {
    // Lebih aman menggunakan soft delete (mengubah is_active menjadi false)
    return prisma.pendidikan.update({
        where: { id },
        data: { is_active: false },
    });
}