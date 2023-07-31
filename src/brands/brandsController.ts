import { Request, Response } from 'express';
import { createBrand, getBrandById, getBrands } from './brandsLogic';

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
    const idNumber = parseInt(id);
    const result = await getBrandById(idNumber);
    if (result) {
      res.json(result);
      return;
    }
    res.status(404).json({ message: `Brand: ${id} not found` });
    return;
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
