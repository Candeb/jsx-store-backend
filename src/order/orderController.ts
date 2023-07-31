import { Request, Response } from 'express';
import {
  createOrder,
  deleteOrderById,
  getActiveOrdersByUserId,
  getAllOrders,
  getAllOrdersByUserId,
  getOrderById,
} from './orderLogic';

export const getAllOrdersController = async (req: Request, res: Response) => {
  try {
    const orders = await getAllOrders();
    res.json(orders);
  } catch (err) {
    res.status(500).send(err);
    return;
  }
};

export const createOrderController = async (req: Request, res: Response) => {
  const { productsIds, userId } = req.body;

  try {
    const result = await createOrder(userId, productsIds);
    res.json(result);
    return;
  } catch (err) {
    res.status(500).send(err);
    return;
  }
};

export const getOrderByIdController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await getOrderById(+id);
    if (result) {
      res.json(result);
      return;
    }
    res.status(404).json({
      message: `La orden con el id ${id} no puede mostrarse porque no existe.`,
    });
    return;
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllOrdersByUserIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = req.params.id;
    const result = await getAllOrdersByUserId(+id);
    if (result) {
      res.json(result);
      return;
    }
    res.status(404).json({
      message: `El usuario con el id ${id} no registra órdenes.`,
    });
    return;
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getActiveOrdersByUserIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = req.params.id;
    const result = await getActiveOrdersByUserId(+id);
    if (result) {
      res.json(result);
      return;
    }
    res.status(404).json({
      message: `El usuario con el id ${id} no registra órdenes activas.`,
    });
    return;
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteOrderByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    await deleteOrderById(+id);
    res.send(`La orden n° ${id} fue eliminado con éxito.`);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
