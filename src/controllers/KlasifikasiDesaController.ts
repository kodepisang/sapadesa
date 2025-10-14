// File: src/controllers/KlasifikasiDesaController.ts

import type { Request, Response } from 'express';
import type {CreateKlasifikasiDesaDto, KlasifikasiDesaUpdateDto} from "../types/MasterKlasifikasiDesa.js";
import * as KlasifikasiDesaService from '../services/KlasifikasiDesaService.js';

// Re-use logic yang sama seperti AgamaController, hanya berbeda service
export const create = async (req: Request<{}, {}, CreateKlasifikasiDesaDto>, res: Response) => {
    try {
        const KlasifikasiDesa = await KlasifikasiDesaService.createKlasifikasiDesa(req.body);
        res.status(201).json({ message: 'Klasifikasi Desa berhasil ditambahkan.', data: KlasifikasiDesa });
    } catch (error) {
        if (error instanceof Error && 'code' in error && error.code === 'P2002') {
            return res.status(409).json({ message: 'Nama Klasifikasi Desa sudah terdaftar.' });
        }
        res.status(500).json({ message: 'Gagal menambahkan Klasifikasi Desa.', error });
    }
};

export const findAll = async (req: Request, res: Response) => {
    try {
        const { page, limit, order, orderByField } = req.query;

        const pageNumber = parseInt(page as string) || 1;
        const limitNumber = parseInt(limit as string) || 10;
        const orderValue: 'asc' | 'desc' = (order as string)?.toLowerCase() === 'desc' ? 'desc' : 'asc';

        const result = await KlasifikasiDesaService.getAllKlasifikasiDesa(
            pageNumber,
            limitNumber,
            orderValue,
            orderByField as string
        );

        res.status(200).json(result);
    } catch (error) {
        console.error('Error saat mengambil daftar Klasifikasi Desa:', error);
        res.status(500).json({ message: 'Gagal mengambil daftar Klasifikasi Desa.', error });
    }
};

export const findOne = async (req: Request, res: Response) => {
    try {
        const KlasifikasiDesa = await KlasifikasiDesaService.getKlasifikasiDesaById(req.params.id!);
        if (!KlasifikasiDesa) {
            return res.status(404).json({ message: 'Klasifikasi Desa tidak ditemukan.' });
        }
        res.status(200).json(KlasifikasiDesa);
    } catch (error) {
        res.status(500).json({ message: 'Gagal mengambil data Klasifikasi Desa.', error });
    }
};

export const update = async (req: Request<{id:string}, {}, KlasifikasiDesaUpdateDto>, res: Response) => {
    try {
        const KlasifikasiDesa = await KlasifikasiDesaService.updateKlasifikasiDesa(req.params.id!, req.body);
        res.status(200).json({ message: 'Klasifikasi Desa berhasil diperbarui.', data: KlasifikasiDesa });
    } catch (error) {
        if (error instanceof Error && 'code' in error && error.code === 'P2002') {
            return res.status(409).json({ message: 'Nama Klasifikasi Desa sudah terdaftar.' });
        }
        res.status(500).json({ message: 'Gagal memperbarui Klasifikasi Desa.', error });
    }
};

export const remove = async (req: Request, res: Response) => {
    try {
        await KlasifikasiDesaService.deleteKlasifikasiDesa(req.params.id!);
        res.status(200).json({ message: 'Klasifikasi Desa berhasil dinonaktifkan.' });
    } catch (error) {
        res.status(500).json({ message: 'Gagal menonaktifkan Klasifikasi Desa.', error });
    }
};