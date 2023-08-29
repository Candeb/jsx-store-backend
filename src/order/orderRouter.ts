import { Router } from 'express';
import * as controllers from '../order/orderController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { authAdminMiddleware } from '../middlewares/authAdminMiddleware';

export const orderRouter = Router();

// orderRouter.use(authMiddleware);

// logueados
orderRouter.post('/new', authMiddleware, controllers.createOrderController);
orderRouter.get(
  '/active/user',
  authMiddleware,
  controllers.getActiveOrdersByUserIdController
);

// ADMIN
orderRouter.get(
  '/orders',
  // authMiddleware,
  // authAdminMiddleware,
  controllers.getAllOrdersController
);
orderRouter.get(
  '/user/:id',
  // authMiddleware,
  // authAdminMiddleware,
  controllers.getAllOrdersByUserIdController
);
orderRouter.get(
  '/:id',
  // authMiddleware,
  // authAdminMiddleware,
  controllers.getOrderByIdController
);
orderRouter.delete(
  '/delete/:id',
  // authMiddleware,
  // authAdminMiddleware,
  controllers.deleteOrderByIdController
);
