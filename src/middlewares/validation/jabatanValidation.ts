// File: src/middlewares/validation/jabatanValidation.ts

import { body} from 'express-validator';


/**
 * Aturan Validasi Khusus untuk endpoint CREATE dan UPDATE Jabatan
 */
export const createJabatanRules = [
    // 1. Validasi nama_jabatan
    body('nama_jabatan')
        .notEmpty().withMessage('Nama jabatan tidak boleh kosong.').bail()
        .isString().withMessage('Nama jabatan harus berupa teks.').bail()
        .trim().isLength({ min: 3, max: 100 }).withMessage('Nama jabatan minimal 3 karakter dan maksimal 100 karakter.'),

    // 2. Validasi level (opsional, jika disertakan harus integer)
    body('level')
        .notEmpty().withMessage('Level jabatan tidak boleh kosong.').bail()
        .isInt({ min: 1, max: 99 }).withMessage('Level harus berupa angka integer antara 1 hingga 99 (1=Tertinggi).')
];

