
import express from 'express';
import type { Application, Request, Response } from 'express';
import authRoutes from "./routes/AuthRoutes.js";
import userRoutes from "./routes/UserRoutes.js";
import agamaRoutes from "./routes/AgamaRoutes.js";
import jabatanRoutes from "./routes/JabatanRoutes.js";
import KlasifikasiDesaRoutes from "./routes/KlasifikasiDesaRoutes.js";
import PendidikanRoutes from "./routes/PendidikanRoutes.js";
import cors, { type CorsOptions } from 'cors';

const app: Application = express();
const PORT = process.env.PORT || 5000;
const allowedOrigins = process.env.CORS_ORIGINS?.split(',') || []
// CORS
const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
        // Izinkan request tanpa origin (misalnya: Postman, permintaan dari file:///, atau yang sama)
        if (!origin) return callback(null, true);

        // Cek apakah origin yang meminta ada di daftar yang diizinkan
        if (allowedOrigins.indexOf(origin) !== -1 || allowedOrigins.length === 0) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'), false);
        }
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Metode HTTP yang diizinkan
    credentials: true, // Izinkan cookies dikirim
    optionsSuccessStatus: 204 // Standar untuk pre-flight request
};
// Middleware
app.use(cors(corsOptions)); // milddleware CORS opsi custom
app.use(express.json()); // Body parser untuk JSON
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/master/agama', agamaRoutes);
app.use('/api/v1/master/jabatan', jabatanRoutes);
app.use('/api/v1/master/klasifikasiDesa', KlasifikasiDesaRoutes);
app.use('/api/v1/master/pendidikan', PendidikanRoutes)
// Basic Route
app.get('/', (req: Request, res: Response) => {
    res.send('SAPADESA Backend is running! (Sistem Informasi Aparatur Desa)');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

