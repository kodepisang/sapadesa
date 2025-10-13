// File: src/services/AuthService.ts

import { PrismaClient, type User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import type { SignOptions } from 'jsonwebtoken';
const prisma = new PrismaClient();
const JWT_SECRET : string = process.env.JWT_SECRET || 'fallback_secret';
const JWT_EXPIRES_IN : string  = process.env.JWT_EXPIRES_IN || '1h' ;

/**
 * Logika utama untuk otentikasi user
 * @param username
 * @param password
 * @returns Token JWT dan data user, atau null jika gagal
 * @create by mustaqim[bananacode7]
 */

export async function authenticateUser(username: string, password: string): Promise<{ token: string, user: Omit<User, 'password'> } | null> {

    // 1. Cari User berdasarkan username
    const user = await prisma.user.findUnique({
        where: { username },
        include: { role: true }, // Sertakan data role
    });

    if (!user || !user.is_active) {
        return null; // User tidak ditemukan atau tidak aktif
    }

    // 2. Bandingkan Password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        return null; // Password salah
    }

    // 3. Buat Payload JWT
    const payload = {
        id: user.id,
        username: user.username,
        role: user.role.name
    };

    // 4. Buat Token JWT
    const token = jwt.sign(
        payload,
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN } as SignOptions
    );

    // Hapus password dari objek user sebelum dikirim ke client
    const { password: _, ...userWithoutPassword } = user;

    return { token, user: userWithoutPassword };
}