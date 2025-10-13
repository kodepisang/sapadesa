// File: src/controllers/JabatanController.ts

import type { Request, Response } from 'express';
import type {CreateJabatanDto, UpdateJabatanDto} from "../types/MasterJabatan.js";
import * as JabatanService from '../services/JabatanService.js';

// Re-use logic yang sama seperti AgamaController, hanya berbeda service
export const create = async (req: Request<{}, {}, CreateJabatanDto>, res: Response) => {
    try {
        const jabatan = await JabatanService.createJabatan(req.body);
        res.status(201).json({ message: 'Jabatan berhasil ditambahkan.', data: jabatan });
    } catch (error) {
        if (error instanceof Error && 'code' in error && error.code === 'P2002') {
            return res.status(409).json({ message: 'Nama Jabatan sudah terdaftar.' });
        }
        res.status(500).json({ message: 'Gagal menambahkan Jabatan.', error });
    }
};

export const findAll = async (req: Request, res: Response) => {
    try {
        const { page, limit, order, orderByField } = req.query;

        const pageNumber = parseInt(page as string) || 1;
        const limitNumber = parseInt(limit as string) || 10;
        const orderValue: 'asc' | 'desc' = (order as string)?.toLowerCase() === 'desc' ? 'desc' : 'asc';

        const result = await JabatanService.getAllJabatan(
            pageNumber,
            limitNumber,
            orderValue,
            orderByField as string
        );

        res.status(200).json(result);
    } catch (error) {
        console.error('Error saat mengambil daftar Jabatan:', error);
        res.status(500).json({ message: 'Gagal mengambil daftar Jabatan.', error });
    }
};

export const findOne = async (req: Request, res: Response) => {
    try {
        const jabatan = await JabatanService.getJabatanById(req.params.id!);
        if (!jabatan) {
            return res.status(404).json({ message: 'Jabatan tidak ditemukan.' });
        }
        res.status(200).json(jabatan);
    } catch (error) {
        res.status(500).json({ message: 'Gagal mengambil data Jabatan.', error });
    }
};

export const update = async (req: Request<{id:string}, {}, UpdateJabatanDto>, res: Response) => {
    try {
        const jabatan = await JabatanService.updateJabatan(req.params.id!, req.body);
        res.status(200).json({ message: 'Jabatan berhasil diperbarui.', data: jabatan });
    } catch (error) {
        if (error instanceof Error && 'code' in error && error.code === 'P2002') {
            return res.status(409).json({ message: 'Nama Jabatan sudah terdaftar.' });
        }
        res.status(500).json({ message: 'Gagal memperbarui Jabatan.', error });
    }
};

export const remove = async (req: Request, res: Response) => {
    try {
        await JabatanService.deleteJabatan(req.params.id!);
        res.status(200).json({ message: 'Jabatan berhasil dinonaktifkan.' });
    } catch (error) {
        res.status(500).json({ message: 'Gagal menonaktifkan Jabatan.', error });
    }
};