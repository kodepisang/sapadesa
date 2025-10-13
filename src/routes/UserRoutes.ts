// File: src/routes/UserRoutes.ts

import { Router } from 'express';
import {protect} from "../middlewares/authMiddleware.js";


const router = Router();

// endpoint yang terlindungi
router.get('/profile', protect, (req, res) => {
    // req.user tersedia di sini berkat middleware 'protect'
    res.json({
        message: 'Akses berhasil. Data user dari Token:',
        user: (req as any).user // Casting ke 'any' untuk kemudahan, idealnya gunakan interface AuthRequest
    });
});

export default router;