// File: src/middlewares/validation/agamaValidation.ts (UPDATED)

import { body, validationResult, type ContextRunner } from 'express-validator';
import type { Request, Response, NextFunction } from 'express';

/**
 * Middleware Validator Generik: Mengambil array aturan validasi
 * dan menjalankannya secara berurutan, lalu mengecek hasilnya.
 * * @param validations - Array of validation rules (e.g., createAgamaRules)
 */
export const validate = (validations: ContextRunner[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {

        // 1. Jalankan semua validasi secara berurutan
        for (const validation of validations) {
            await validation.run(req);
        }

        // 2. Kumpulkan hasilnya setelah semua aturan dijalankan
        const errors = validationResult(req);

        if (errors.isEmpty()) {
            return next();
        }

        // 3. Jika ada error, kirim respons 400
        return res.status(400).json({
            message: 'Validasi data gagal.',
            errors: errors.array()
        });
    };
};

/**
 * Aturan Validasi Khusus untuk endpoint CREATE dan UPDATE Agama
 */
export const createAgamaRules = [
    // 1. Cek keberadaan properti, dan hentikan proses jika null/undefined
    body('nama_agama')
        .notEmpty().withMessage('Nama agama tidak boleh kosong.').bail()
        .isString().withMessage('Nama agama harus berupa teks.').bail()
        .trim().isLength({ min: 3, max:30 }).withMessage('Nama agama minimal 3 karakter dan maksimal 30 karakter.'),
];