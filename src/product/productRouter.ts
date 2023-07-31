import { Router } from 'express';
import * as controllers from '../product/productController';

export const productRouter = Router();

productRouter.get('/products', controllers.getAllProductsController);
productRouter.get('/:id', controllers.getProductByIdController);
productRouter.post('/new', controllers.createProductController);
productRouter.put('/update/:id', controllers.updateProductController);
productRouter.delete('/delete/:id', controllers.deleteProductByIdController);
productRouter.get('/brand/id/:id', controllers.getProductsByBrandIdController);
productRouter.get(
  '/brand/name/:name',
  controllers.getProductsByBrandNameController
);
