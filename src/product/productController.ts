import {
  createProduct,
  deleteProductById,
  getAllProducts,
  getProductById,
  updateProduct,
} from './productLogic';
import { Request, Response } from 'express';

export const createProductController = async (req: Request, res: Response) => {
  const { name, description, picture, price, brandsId, available } = req.body;
  try {
    const result = await createProduct(
      name,
      description,
      picture,
      price,
      brandsId,
      available
    );
    console.log('reqbody-->', req.body);
    res.json(result);
    return;
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
    return;
  }
};

export const getAllProductsController = async (req: Request, res: Response) => {
  try {
    const products = await getAllProducts();
    res.json(products);
  } catch (err) {
    res.status(500).send(err);
    return;
  }
};

export const getProductByIdController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await getProductById(+id);
    if (result) {
      res.json(result);
      return;
    }
    res.status(404).json({
      message: `El producto con el id ${id} no puede mostrarse porque no existe.`,
    });
    return;
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProductController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { name, description, picture, price, brandsId, available } = req.body;
    const result = await updateProduct(
      +id,
      name,
      description,
      picture,
      price,
      brandsId,
      available
    );
    if (result) {
      res.json(result);
      return;
    }
    res.status(404).json({
      message: `El producto con el id ${id} no se puede actualizar porque no existe.`,
    });
    return;
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProductByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    await deleteProductById(+id);
    res.send('El producto fue eliminado con éxito.');
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
