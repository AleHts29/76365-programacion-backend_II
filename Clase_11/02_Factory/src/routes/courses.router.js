import { Router } from 'express';
import * as CourseControllers from '../controllers/courses.controllers.js';

const router = Router();


router.get('/', CourseControllers.getAllCourses);
router.post('/', CourseControllers.saveCourse);

export default router;