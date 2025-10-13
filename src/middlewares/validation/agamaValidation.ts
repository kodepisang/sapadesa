// File: src/middlewares/validation/agamaValidation.ts (UPDATED)

import { body } from 'express-validator';



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