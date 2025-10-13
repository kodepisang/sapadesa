// File: src/middlewares/authMiddleware.ts
import express from "express";
import type { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

// Tambahkan definisi untuk JWT payload di Express Request
// Properti user akan ditambahkan setelah verifikasi
interface AuthRequest extends Request {
    user?: {
        id: string;
        username: string;
        role: string;
    };
}

export const protect = (req: AuthRequest, res: Response, next: NextFunction) => {
    // 1. Ambil token dari Header Authorization
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Akses ditolak. Token tidak ditemukan atau format tidak valid.' });
    }

    const token = authHeader.split(' ')[1]; // Ambil bagian token setelah 'Bearer '

    try {
        // 2. Verifikasi Tokenole: string };
        const decoded = jwt.verify(token as string, JWT_SECRET) as { id: string; username: string; role: string };

        // 3. Tambahkan data user (payload JWT) ke request object
        req.user = decoded;
        // 4. Lanjutkan ke Controller
        next();
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ message: 'Token kadaluarsa.' });
        }
        return res.status(401).json({ message: 'Token tidak valid.' });
    }
};