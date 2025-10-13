// File: src/services/JabatanService.ts

import { PrismaClient, Prisma,type Jabatan } from '@prisma/client';
import type {CreateJabatanDto, JabatanResponseDto} from "../types/MasterJabatan.js";
import {paginate, type PaginatedResult} from "../utilities/pagination.js";


const prisma = new PrismaClient();

// --- Mapper ---
function mapToJabatanResponse(jabatan: Jabatan): JabatanResponseDto {
    return {
        id: jabatan.id,
        nama_jabatan: jabatan.nama_jabatan,
        level: jabatan.level,
        is_active: jabatan.is_active,
        created_at: jabatan.created_at,
        updated_at: jabatan.updated_at,
    };
}
// type AgamaCreateInput = Prisma.AgamaCreateInput
// --- C: Create ---
export async function createJabatan(data: CreateJabatanDto) {
    const jabatan = await prisma.jabatan.create({data});
    return mapToJabatanResponse(jabatan);
}

// --- R: Read All (Pagination) ---
export async function getAllJabatan(
    page: number = 1,
    limit: number = 10,
    order: "asc" | "desc" = 'asc',
    orderByField?: string, // Default order by level
): Promise<PaginatedResult<JabatanResponseDto>> {

    const orderBy: any = {};
    if (orderByField && ['id', 'nama_jabatan', 'level', 'created_at', 'updated_at'].includes(orderByField as string)) {
        orderBy[orderByField] = order;
    } else {
        orderBy['updated_at'] = 'desc'; // Fallback
    }

    const findManyArgs = {
        where: orderByField ? { is_active: true } : {},
    };

    const paginatedResult = await paginate(
        prisma.jabatan,
        page,
        limit,
        orderBy,
        findManyArgs
    );

    const dataResponse = paginatedResult.data.map(mapToJabatanResponse);

    return {
        ...paginatedResult,
        data: dataResponse,
    };
}

// --- R: Read One ---
export async function getJabatanById(id: string) {
    const jabatan = await prisma.jabatan.findUnique({ where: { id } });
    return jabatan ? mapToJabatanResponse(jabatan) : null;
}

// --- U: Update ---
export async function updateJabatan(id: string, data: Partial<CreateJabatanDto>) {
    const jabatan = await prisma.jabatan.update({
        where: { id },
        data,
    });
    return mapToJabatanResponse(jabatan);
}

// --- D: Delete (Soft Delete) ---
export async function deleteJabatan(id: string) {
    return prisma.jabatan.update({
        where: { id },
        data: { is_active: false },
    });
}