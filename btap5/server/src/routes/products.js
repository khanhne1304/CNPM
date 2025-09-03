import { Router } from 'express';
import { listProducts } from '../controllers/products.js';
const router = Router();
router.get('/products', listProducts);
export default router;
