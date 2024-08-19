import { Router } from "express";
import {
  saveShoppingList,
  getSavedProducts,
} from "../controllers/productController";

const router = Router();

router.post("/", saveShoppingList);
router.get("/", getSavedProducts);

export default router;
