// File: prisma/seed.ts

import { PrismaClient,type Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const saltRounds = 10; // Nilai salt standar untuk bcrypt

/**
 * Data Role Awal
 * Disarankan untuk memiliki setidaknya tiga role dasar.
 */
const initialRoles: Omit<Role, 'id' | 'users'>[] = [
    { name: 'SuperAdmin', description: 'Administrator tertinggi sistem SAPADESA.' },
    { name: 'KepalaDesa', description: 'Akses terbatas untuk Kepala Desa.' },
    { name: 'StafAparatur', description: 'Aparatur Desa dengan akses input data dasar.' },
];

/**
 * Fungsi Utama untuk Seeding
 */
async function main() {
    console.log(`\n--- Memulai proses Seeding... ---\n`);

    // 1. SEED ROLES
    const roles: { [key: string]: Role } = {};
    for (const roleData of initialRoles) {
        // Cek apakah Role sudah ada untuk menghindari duplikasi
        let role = await prisma.role.findUnique({ where: { name: roleData.name } });

        if (!role) {
            role = await prisma.role.create({ data: roleData });
            console.log(`[Role] Berhasil menambahkan Role: ${role.name}`);
        } else {
            console.log(`[Role] Role sudah ada: ${role.name}`);
        }
        roles[role.name] = role;
    }

    // Pastikan SuperAdmin Role ada sebelum membuat User
    const superAdminRole = roles['SuperAdmin'];
    if (!superAdminRole) {
        throw new Error("Role 'SuperAdmin' tidak ditemukan. Seeding dibatalkan.");
    }

    // 2. SEED SUPERADMIN USER
    const superAdminUsername = 'admin.sapadesa';
    const rawPassword = 'SapadesaAdmin2025@'; // Ganti dengan password kuat!

    // Hashing Password
    const hashedPassword = await bcrypt.hash(rawPassword, saltRounds);

    // Data User SuperAdmin
    const superAdminData = {
        username: superAdminUsername,
        password: hashedPassword,
        nama_lengkap: 'Administrator SAPADESA',
        jabatan: 'Super Admin',
        email: 'admin@sapad.com',
        roleId: superAdminRole.id, // Ambil ID Role SuperAdmin
        is_active: true,
    };

    // Cek apakah User SuperAdmin sudah ada
    let superAdminUser = await prisma.user.findUnique({ where: { username: superAdminUsername } });

    if (!superAdminUser) {
        superAdminUser = await prisma.user.create({ data: superAdminData });
        console.log(`[User] Berhasil menambahkan SuperAdmin: ${superAdminUser.username}`);
        console.log(`[INFO] Password SuperAdmin adalah: ${rawPassword}`);
    } else {
        console.log(`[User] User SuperAdmin sudah ada: ${superAdminUser.username}`);
        // Anda bisa memilih untuk mengupdate password jika User sudah ada
        // await prisma.user.update({ where: { id: superAdminUser.id }, data: { password: hashedPassword } });
    }

    console.log(`\n--- Proses Seeding Selesai. ---`);
}

/**
 * Panggil fungsi utama dan tangani error
 */
main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });