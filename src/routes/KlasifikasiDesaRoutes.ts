// File: src/routes/KlasifikasiDesaRoutes.ts

import { Router } from 'express';
import * as KlasifikasiDesaController from '../controllers/KlasifikasiDesaController.js';
import { protect } from '../middlewares/authMiddleware.js';

import {validate} from "../middlewares/validation/Validate.js";
import {createKlasifikasiDesaRules} from "../middlewares/validation/klasifikasiDesaValidation.js";

const router = Router();

router.use(protect);

// C - Create
router.post('/', validate(createKlasifikasiDesaRules), KlasifikasiDesaController.create);

// R - Read All
router.get('/', KlasifikasiDesaController.findAll);

// R - Read One
router.get('/:id', KlasifikasiDesaController.findOne);

// U - Update
router.put('/:id', validate(createKlasifikasiDesaRules), KlasifikasiDesaController.update);

// D - Delete (Soft Delete)
router.delete('/:id', KlasifikasiDesaController.remove);

export default router;