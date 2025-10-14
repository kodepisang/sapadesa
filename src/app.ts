
import express from 'express';
import type { Application, Request, Response } from 'express';
import authRoutes from "./routes/AuthRoutes.js";
import userRoutes from "./routes/UserRoutes.js";
import agamaRoutes from "./routes/AgamaRoutes.js";
import jabatanRoutes from "./routes/JabatanRoutes.js";
import KlasifikasiDesaRoutes from "./routes/KlasifikasiDesaRoutes.js";
// import router dari routes/index.ts

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // Body parser untuk JSON
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/master/agama', agamaRoutes);
app.use('/api/v1/master/jabatan', jabatanRoutes);
app.use('/api/v1/master/klasifikasiDesa', KlasifikasiDesaRoutes);
// Basic Route
app.get('/', (req: Request, res: Response) => {
    res.send('SAPADESA Backend is running! (Sistem Informasi Aparatur Desa)');
});

// Panggil Route Utama di sini
// app.use('/api/v1', mainRouter);

// Server Start
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

