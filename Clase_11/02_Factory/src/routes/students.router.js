import { Router } from 'express';
import * as StudentControllers from '../controllers/student.controllers.js';

const router = Router();

router.get('/', StudentControllers.getAllStudents);
router.post('/', StudentControllers.saveStudent);

export default router;