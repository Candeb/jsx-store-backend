import { Router } from 'express';
import * as controllers from '../brands/brandsController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { authAdminMiddleware } from '../middlewares/authAdminMiddleware';

export const brandsRouter = Router();
brandsRouter.put('/update/:id', controllers.updateBrandController);
brandsRouter.delete('/delete/:id', controllers.deleteBrandByIdController);

// libre
brandsRouter.get(
  '/products/id/:id',
  controllers.getProductsByBrandIdController
);
brandsRouter.get(
  '/products/name/:name',
  controllers.getProductsByBrandNameController
);
brandsRouter.get('/allbrands', controllers.getAllBrandsController);
// brandsRouter.get('/brands/active', controllers.getActiveBrandsController);

// ADMIN
brandsRouter.get(
  '/:id',
  // authMiddleware,
  // authAdminMiddleware,
  controllers.getBrandByIdController
);
brandsRouter.post(
  '/new',
  // authMiddleware,
  // authAdminMiddleware,
  controllers.createBrandsController
);
