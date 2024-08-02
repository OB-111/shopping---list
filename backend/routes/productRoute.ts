import { Router } from "express";
import { saveProdcuts } from "../controllers/productController";



const router = Router();
router.post('/save',saveProdcuts);

export default router;