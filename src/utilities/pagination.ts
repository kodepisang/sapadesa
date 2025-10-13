// File: src/utilities/pagination.ts (UPDATED)

import { Prisma } from '@prisma/client';

// Tipe data kembalian (metadata + data)
export interface PaginatedResult<T> {
    data: T[];
    totalData: number;
    currentPage: number;
    limit: number; // Mengubah pageSize menjadi limit
    totalPages: number;
}

// Tipe default untuk Order By Prisma (e.g., { field: 'asc' | 'desc' })
type OrderByInput = Prisma.AgamaOrderByWithRelationInput;

/**
 * Fungsi Generik untuk menangani Pagination pada kueri Prisma findMany.
 * @param model - Model Prisma (misal: prisma.agama)
 * @param page - Halaman yang diminta (default 1)
 * @param limit - Batas data per halaman (default 10)
 * @param orderBy - Kriteria pengurutan (misal: { nama_agama: 'asc' })
 * @param findManyArgs - Argumen findMany kustom (where, select, include, dll.)
 * @returns Objek dengan data, totalData, dan metadata pagination.
 */
export async function paginate<T>(
    model: {
        findMany: (args: any) => Promise<T[]>;
        count: (args: any) => Promise<number>;
    },
    page: number = 1,
    limit: number = 10, // Parameter baru: limit (default 10)
    orderBy: OrderByInput | undefined = undefined, // Parameter baru: orderBy
    findManyArgs: Prisma.AgamaFindManyArgs = {},
): Promise<PaginatedResult<T>> {

    // Pastikan halaman tidak kurang dari 1 dan limit valid
    const currentPage = Math.max(1, page);
    const currentLimit = Math.max(1, limit); // Minimal 1 data per halaman

    // Hitung berapa data yang harus dilewati (skip/offset)
    const skip = (currentPage - 1) * currentLimit;

    // 1. Ambil data dengan SKIP, TAKE, dan ORDER BY
    const data = await model.findMany({
        ...findManyArgs,
        skip: skip,
        take: currentLimit,
        orderBy: orderBy, // Terapkan urutan
    });

    // 2. Hitung total data
    const totalData = await model.count({
        where: findManyArgs.where,
    });

    // 3. Hitung total halaman
    const totalPages = Math.ceil(totalData / currentLimit);

    // 4. Kembalikan data dan metadata
    return {
        data: data,
        totalData: totalData,
        currentPage: currentPage,
        limit: currentLimit,
        totalPages: totalPages,
    };
}