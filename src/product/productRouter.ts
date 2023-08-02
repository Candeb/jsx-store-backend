import { Router } from 'express';
import * as controllers from '../product/productController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { authAdminMiddleware } from '../middlewares/authAdminMiddleware';

export const productRouter = Router();

// libre
productRouter.get('/products', controllers.getAllProductsController);
productRouter.get('/:id', controllers.getProductByIdController);

// ADMIN
productRouter.post(
  '/new',
  authMiddleware,
  authAdminMiddleware,
  controllers.createProductController
);
productRouter.put(
  '/update/:id',
  authMiddleware,
  authAdminMiddleware,
  controllers.updateProductController
);
productRouter.delete(
  '/delete/:id',
  authMiddleware,
  authAdminMiddleware,
  controllers.deleteProductByIdController
);
