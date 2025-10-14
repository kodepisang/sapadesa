// File: src/middlewares/validation/klasifikasiDesaValidation.ts

import { body} from 'express-validator';


/**
 * Aturan Validasi Khusus untuk endpoint CREATE dan UPDATE KlasifikasiDesa
 */
export const createKlasifikasiDesaRules = [
    // 1. Validasi nama_KlasifikasiDesa
    body('nama_klasifikasi')
        .notEmpty().withMessage('Nama klasifikasi Desa tidak boleh kosong.').bail()
        .isString().withMessage('Nama klasifikasi Desa harus berupa teks.').bail()
        .trim().isLength({ min: 3, max: 100 }).withMessage('Nama Klasifikasi Desa minimal 3 karakter dan maksimal 100 karakter.'),

    // 2. Validasi deskripsi (opsional, jika disertakan harus string dan panjangnya antara 10-255 karakter)
    body('deskripsi')
        .optional({ nullable: true })
        .notEmpty().withMessage('deskripsi Klasifikasi Desa tidak boleh kosong.').bail()
        .trim().isLength({ min: 5, max: 255 }).withMessage('Deskripsi Desa minimal 5 karakter dan maksimal 255 karakter.')
];

