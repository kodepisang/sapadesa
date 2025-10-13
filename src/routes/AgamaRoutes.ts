// File: src/routes/AgamaRoutes.ts

import { Router } from 'express';
import * as AgamaController from '../controllers/AgamaController.js';
import { protect } from '../middlewares/authMiddleware.js';
import {createAgamaRules, validate} from "../middlewares/validation/agamaValidation.js";

const router = Router();

// Semua route Master Agama harus dilindungi!
router.use(protect);

// C - Create
router.post('/',validate(createAgamaRules), AgamaController.create);

// R - Read All
router.get('/', AgamaController.findAll);

// R - Read One
router.get('/:id', AgamaController.findOne);

// U - Update
router.put('/:id', validate(createAgamaRules), AgamaController.update);

// D - Delete (Soft Delete)
router.delete('/:id', AgamaController.remove);

export default router;