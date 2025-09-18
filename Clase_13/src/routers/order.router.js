import { Router } from 'express';
import { getOrders, getOrderById, saveOrder } from '../controllers/order.controller.js';

const router = Router();



router.get("/", getOrders);
router.get("/:uid", getOrderById);
router.post("/", saveOrder);


export default router;