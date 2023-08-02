import { Request, Response } from 'express';
import {
  createBrand,
  getBrandById,
  getBrands,
  getProductsByBrandId,
  getProductsByBrandName,
} from './brandsLogic';

export const createBrandsController = async (req: Request, res: Response) => {
  const { name, picture } = req.body;
  try {
    const result = await createBrand(name, picture);
    res.json(result);
    return;
  } catch (err) {
    res.status(500).send(err);
    return;
  }
};

export const getBrandsController = async (req: Request, res: Response) => {
  try {
    const brands = await getBrands();
    res.json(brands);
  } catch (err) {
    res.status(500).send(err);
    return;
  }
};

export const getBrandByIdController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await getBrandById(+id);
    if (result) {
      res.json(result);
      return;
    }
    res
      .status(404)
      .json({
        message: `La marca con el id ${id} no puede mostrarse porque no existe`,
      });
    return;
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
