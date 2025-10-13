// File: src/controllers/AgamaController.ts

import type { Request, Response } from 'express';
import * as AgamaService from '../services/AgamaService.js';
import type {AgamaUpdateDto, CreateAgamaDto} from "../types/MasterAgama.js";

// --- C: Create ---
export const create = async (req: Request<CreateAgamaDto>, res: Response) => {
    try {
        const agama = await AgamaService.createAgama(req.body);
        res.status(201).json({ message: 'Agama berhasil ditambahkan.', data: agama });
    } catch (error) {
        // Menangani error jika 'nama_agama' sudah ada (unique constraint)
        if (error instanceof Error && 'code' in error && error.code === 'P2002') {
            return res.status(409).json({ message: 'Nama Agama sudah terdaftar.' });
        }
        res.status(500).json({ message: 'Gagal menambahkan Agama.', error });
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
        const result = await AgamaService.getAllAgama(
            pageNumber,
            limitNumber,
            orderValue,
            orderByField as string // Biarkan service yang melakukan validasi field
        );

        res.status(200).json(result);
    } catch (error) {
        console.error('Error saat mengambil daftar Agama:', error);
        res.status(500).json({ message: 'Gagal mengambil daftar Agama.', error });
    }
};

// --- R: Read One ---
export const findOne = async (req: Request, res: Response) => {
    try {
        const agama = await AgamaService.getAgamaById(req.params.id!);
        if (!agama) {
            return res.status(404).json({ message: 'Agama tidak ditemukan.' });
        }
        res.status(200).json(agama);
    } catch (error) {
        res.status(500).json({ message: 'Gagal mengambil data Agama.', error });
    }
};

// --- U: Update ---
export const update = async (req: Request<{id:string},{},AgamaUpdateDto>, res: Response) => {
    console.log(req.body);
    try {
        const agama = await AgamaService.updateAgama(req.params.id!, req.body);
        res.status(200).json({ message: 'Agama berhasil diperbarui.', data: agama });
    } catch (error) {
        if (error instanceof Error && 'code' in error && error.code === 'P2002') {
            return res.status(409).json({ message: 'Nama Agama sudah terdaftar.' });
        }
        res.status(500).json({ message: 'Gagal memperbarui Agama.', error });
    }
};

// --- D: Delete (Soft Delete) ---
export const remove = async (req: Request, res: Response) => {
    try {
        await AgamaService.deleteAgama(req.params.id!);
        res.status(200).json({ message: 'Agama berhasil dinonaktifkan.' });
    } catch (error) {
        res.status(500).json({ message: 'Gagal menonaktifkan Agama.', error });
    }
};