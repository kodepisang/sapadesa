// File: src/routes/JabatanRoutes.ts

import { Router } from 'express';
import * as JabatanController from '../controllers/JabatanController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { createJabatanRules } from '../middlewares/validation/jabatanValidation.js';
import {validate} from "../middlewares/validation/Validate.js";

const router = Router();

router.use(protect);

// C - Create
router.post('/', validate(createJabatanRules), JabatanController.create);

// R - Read All
router.get('/', JabatanController.findAll);

// R - Read One
router.get('/:id', JabatanController.findOne);

// U - Update
router.put('/:id', validate(createJabatanRules), JabatanController.update);

// D - Delete (Soft Delete)
router.delete('/:id', JabatanController.remove);

export default router;