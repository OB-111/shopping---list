import { Router } from "express";
import {
  addOrUpdateProducts,
  deleteSavedProducts,
  getSavedProducts,
  updateShoppingList,
} from "../controllers/productController";

const router = Router();

router.post("/", addOrUpdateProducts);
router.get("/", getSavedProducts);
router.post("/update", updateShoppingList);
router.post("/delete", deleteSavedProducts);

export default router;
