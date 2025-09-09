import { Router } from 'express';
import {
    getDatosControllers,
    postDatosControllers,
    putDatosControllers,
    deleteDatosControllers,
} from '../controllers/product.controllers.js'

const router = Router();


// GET
router.get('/', getDatosControllers)

// POST
router.post('/', postDatosControllers)

// PUT
router.put('/', putDatosControllers)

// DELETE
router.delete('/', deleteDatosControllers)


export default router;