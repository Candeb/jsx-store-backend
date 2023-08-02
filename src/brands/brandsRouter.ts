import { Router } from 'express';
import * as controllers from '../brands/brandsController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { authAdminMiddleware } from '../middlewares/authAdminMiddleware';

export const brandsRouter = Router();

// libre
brandsRouter.get(
  '/products/id/:id',
  controllers.getProductsByBrandIdController
);
brandsRouter.get(
  '/products/name/:name',
  controllers.getProductsByBrandNameController
);
brandsRouter.get('/brands', controllers.getBrandsController);

// ADMIN
brandsRouter.get(
  '/:id',
  authMiddleware,
  authAdminMiddleware,
  controllers.getBrandByIdController
);
brandsRouter.post(
  '/new',
  authMiddleware,
  authAdminMiddleware,
  controllers.createBrandsController
);
