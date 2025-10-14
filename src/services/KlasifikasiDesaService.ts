// File: src/services/KlasifikasiDesaService.ts

import { PrismaClient,type KlasifikasiDesa } from '@prisma/client';
import type {CreateKlasifikasiDesaDto, KlasifikasiDesaResponseDto} from "../types/MasterKlasifikasiDesa.js";
import {paginate, type PaginatedResult} from "../utilities/pagination.js";


const prisma = new PrismaClient();

// --- Mapper ---
function mapToKlasifikasiDesaResponse(KlasifikasiDesa: KlasifikasiDesa): KlasifikasiDesaResponseDto {
    return {
        id: KlasifikasiDesa.id,
        nama_klasifikasi: KlasifikasiDesa.nama_klasifikasi,
        deskripsi: KlasifikasiDesa.deskripsi || '-',
        is_active: KlasifikasiDesa.is_active,
        created_at: KlasifikasiDesa.created_at,
        updated_at: KlasifikasiDesa.updated_at,
    };
}
// type AgamaCreateInput = Prisma.AgamaCreateInput
// --- C: Create ---
export async function createKlasifikasiDesa(data: CreateKlasifikasiDesaDto) {
    const KlasifikasiDesa = await prisma.klasifikasiDesa.create({data});
    return mapToKlasifikasiDesaResponse(KlasifikasiDesa);
}

// --- R: Read All (Pagination) ---
export async function getAllKlasifikasiDesa(
    page: number = 1,
    limit: number = 10,
    order: "asc" | "desc" = 'asc',
    orderByField?: string, // Default order by level
): Promise<PaginatedResult<KlasifikasiDesaResponseDto>> {

    const orderBy: any = {};
    if (orderByField && ['id', 'nama_klasifikasi', 'level', 'created_at', 'updated_at'].includes(orderByField as string)) {
        orderBy[orderByField] = order;
    } else {
        orderBy['updated_at'] = 'desc'; // Fallback
    }

    const findManyArgs = {
        where: orderByField ? { is_active: true } : {},
    };

    const paginatedResult = await paginate(
        prisma.klasifikasiDesa,
        page,
        limit,
        orderBy,
        findManyArgs
    );

    const dataResponse = paginatedResult.data.map(mapToKlasifikasiDesaResponse);

    return {
        ...paginatedResult,
        data: dataResponse,
    };
}

// --- R: Read One ---
export async function getKlasifikasiDesaById(id: string) {
    const KlasifikasiDesa = await prisma.klasifikasiDesa.findUnique({ where: { id } });
    return KlasifikasiDesa ? mapToKlasifikasiDesaResponse(KlasifikasiDesa) : null;
}

// --- U: Update ---
export async function updateKlasifikasiDesa(id: string, data: Partial<CreateKlasifikasiDesaDto>) {
    const KlasifikasiDesa = await prisma.klasifikasiDesa.update({
        where: { id },
        data,
    });
    return mapToKlasifikasiDesaResponse(KlasifikasiDesa);
}

// --- D: Delete (Soft Delete) ---
export async function deleteKlasifikasiDesa(id: string) {
    return prisma.klasifikasiDesa.update({
        where: { id },
        data: { is_active: false },
    });
}