import {
  createProduct,
  deleteProductById,
  getAllProducts,
  getProductById,
  getProductsByBrandId,
  getProductsByBrandName,
  updateProduct,
} from './productLogic';
import { Request, Response } from 'express';

export const createProductController = async (req: Request, res: Response) => {
  const { name, description, picture, price, brandsId } = req.body;
  try {
    const result = await createProduct(
      name,
      description,
      picture,
      price,
      brandsId
    );
    console.log(result);
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
    const idNumber = parseInt(id);
    const result = await getProductById(idNumber);
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
    const idNumber = parseInt(id);
    const { name, description, picture, price, brandsId } = req.body;
    const result = await updateProduct(
      idNumber,
      name,
      description,
      picture,
      price,
      brandsId
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

export const getProductsByBrandIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = req.params.id;

    const result = await getProductsByBrandId(+id);
    if (!result.length) {
      res.status(404).json({
        message: `No se encontraron productos del id de la marca ${id}.`,
      });
    } else if (result) {
      res.json(result);
      return;
    }

    console.log(result);
    res.send(result);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getProductsByBrandNameController = async (
  req: Request,
  res: Response
) => {
  try {
    const { name } = req.params;

    const result = await getProductsByBrandName(name.toLowerCase().trim());

    if (!result.length) {
      res.status(404).json({
        message: `No se encontraron productos de la marca ${name}.`,
      });
    } else if (result) {
      res.json(result);
      return;
    }
    res.send(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
