import { Router } from 'express';
import { addOrUpdateProducts, deleteProduct, getSavedProducts, updateShoppingList } from '../controllers/productController';

const router = Router();

router.post('/', addOrUpdateProducts);
router.delete('/', deleteProduct);
router.get('/', getSavedProducts);
router.post('/update', updateShoppingList);

export default router;
