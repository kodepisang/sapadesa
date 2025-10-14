// File: src/routes/PendidikanRoutes.ts

import { Router } from 'express';
import * as PendidikanController from '../controllers/PendidikanController.js';
import { protect } from '../middlewares/authMiddleware.js';
import {validate} from "../middlewares/validation/Validate.js";
import {createPendidikanRules} from "../middlewares/validation/pendidikanValidation.js";


const router = Router();

// Semua route Master Pendidikan harus dilindungi!
router.use(protect);

// C - Create
router.post('/',validate(createPendidikanRules), PendidikanController.create);

// R - Read All
router.get('/', PendidikanController.findAll);

// R - Read One
router.get('/:id', PendidikanController.findOne);

// U - Update
router.put('/:id', validate(createPendidikanRules), PendidikanController.update);

// D - Delete (Soft Delete)
router.delete('/:id', PendidikanController.remove);

export default router;