import {type ContextRunner, validationResult} from "express-validator";
import type {NextFunction, Request, Response} from "express";

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