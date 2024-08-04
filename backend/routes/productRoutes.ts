import { Router } from 'express';
import { addOrUpdateProducts, deleteProduct, getSavedProducts } from '../controllers/productController';

const router = Router();

router.post('/', addOrUpdateProducts);
router.delete('/', deleteProduct);
router.get('/', getSavedProducts);

export default router;
