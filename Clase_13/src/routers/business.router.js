import { Router } from "express";
import { getBusiness, getBusinessById, saveBusiness, getBusinessByCategory } from "../controllers/business.controller.js";

const router = Router();


router.get("/", getBusiness);
router.get("/:uid", getBusinessById)
router.post("/", saveBusiness)
router.get("/categories/:category", getBusinessByCategory)


export default router;