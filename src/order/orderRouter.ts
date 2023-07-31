import { Router } from 'express';
import * as controllers from '../order/orderController';

export const orderRouter = Router();

orderRouter.get('/orders', controllers.getAllOrdersController);
orderRouter.get('/user/:id', controllers.getAllOrdersByUserIdController);
orderRouter.get(
  '/active/user/:id',
  controllers.getActiveOrdersByUserIdController
);
orderRouter.get('/:id', controllers.getOrderByIdController);
orderRouter.post('/new', controllers.createOrderController);
orderRouter.delete('/delete/:id', controllers.deleteOrderByIdController);
