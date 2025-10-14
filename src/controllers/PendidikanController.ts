// File: src/controllers/PendidikanController.ts

import type { Request, Response } from 'express';
import * as PendidikanService from '../services/PendidikanService.js';
import type {CreatePendidikanDto, UpdatePendidikanDto} from "../types/MasterPendidikan.js";

// --- C: Create ---
export const create = async (req: Request<{},{},CreatePendidikanDto>, res: Response) => {
    try {
        const Pendidikan = await PendidikanService.createPendidikan(req.body);
        res.status(201).json({ message: 'Pendidikan berhasil ditambahkan.', data: Pendidikan });
    } catch (error) {
        // Menangani error jika 'nama_Pendidikan' sudah ada (unique constraint)
        if (error instanceof Error && 'code' in error && error.code === 'P2002') {
            return res.status(409).json({ message: 'Nama Pendidikan sudah terdaftar.' });
        }
        res.status(500).json({ message: 'Gagal menambahkan Pendidikan.', error });
    }
};

// --- R: Read All ---
export const findAll = async (req: Request, res: Response) => {
    try {
        // Ambil query parameter
        const { page, limit, order, orderByField } = req.query;

        // Parsing dan Validasi
        const pageNumber = parseInt(page as string) || 1;
        const limitNumber = parseInt(limit as string) || 10;
        const orderValue: 'asc' | 'desc' = (order as string)?.toLowerCase() === 'desc' ? 'desc' : 'asc';

        // Panggil service dengan parameter yang diambil dari URL
        const result = await PendidikanService.getAllPendidikan(
            pageNumber,
            limitNumber,
            orderValue,
            orderByField as string // Biarkan service yang melakukan validasi field
        );

        res.status(200).json(result);
    } catch (error) {
        console.error('Error saat mengambil daftar Pendidikan:', error);
        res.status(500).json({ message: 'Gagal mengambil daftar Pendidikan.', error });
    }
};

// --- R: Read One ---
export const findOne = async (req: Request, res: Response) => {
    try {
        const Pendidikan = await PendidikanService.getPendidikanById(req.params.id!);
        if (!Pendidikan) {
            return res.status(404).json({ message: 'Pendidikan tidak ditemukan.' });
        }
        res.status(200).json(Pendidikan);
    } catch (error) {
        res.status(500).json({ message: 'Gagal mengambil data Pendidikan.', error });
    }
};

// --- U: Update ---
export const update = async (req: Request<{id:string},{},UpdatePendidikanDto>, res: Response) => {
    try {
        const Pendidikan = await PendidikanService.updatePendidikan(req.params.id!, req.body);
        res.status(200).json({ message: 'Pendidikan berhasil diperbarui.', data: Pendidikan });
    } catch (error) {
        if (error instanceof Error && 'code' in error && error.code === 'P2002') {
            return res.status(409).json({ message: 'Nama Pendidikan sudah terdaftar.' });
        }
        res.status(500).json({ message: 'Gagal memperbarui Pendidikan.', error });
    }
};

// --- D: Delete (Soft Delete) ---
export const remove = async (req: Request, res: Response) => {
    try {
        await PendidikanService.deletependidikan(req.params.id!);
        res.status(200).json({ message: 'Pendidikan berhasil dinonaktifkan.' });
    } catch (error) {
        res.status(500).json({ message: 'Gagal menonaktifkan Pendidikan.', error });
    }
};