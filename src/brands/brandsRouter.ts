import { Router } from 'express';
import * as controllers from '../brands/brandsController';

export const brandsRouter = Router();

brandsRouter.get('/brands', controllers.getBrandsController);
brandsRouter.get('/:id', controllers.getBrandByIdController);
brandsRouter.post('/new', controllers.createBrandsController);
