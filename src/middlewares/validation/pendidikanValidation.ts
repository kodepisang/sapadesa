// File: src/middlewares/validation/pendidikanValidation.ts (UPDATED)

import { body } from 'express-validator';



/**
 * Aturan Validasi Khusus untuk endpoint CREATE dan UPDATE pendidikan
 */
export const createPendidikanRules = [
    // 1. Cek keberadaan properti, dan hentikan proses jika null/undefined
    body('nama_pendidikan')
        .notEmpty().withMessage('Nama pendidikan tidak boleh kosong.').bail()
        .isString().withMessage('Nama pendidikan harus berupa teks.').bail()
        .trim().isLength({ min: 3, max:30 }).withMessage('Nama pendidikan minimal 3 karakter dan maksimal 30 karakter.'),
];