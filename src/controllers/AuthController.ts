// File: src/controllers/AuthController.ts

import type { Request, Response } from 'express';
import {authenticateUser} from "../services/AuthService.js";


export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username dan Password wajib diisi.' });
    }

    try {
        const result = await authenticateUser(username, password);
        if (!result) {
            return res.status(401).json({ message: 'Kredensial tidak valid atau akun tidak aktif.' });
        }

        // Login berhasil
        res.status(200).json({
            message: 'Login berhasil!',
            token: result.token,
            user: result.user
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Terjadi kesalahan server saat login.' });
    }
};