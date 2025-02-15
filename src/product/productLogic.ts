import { prisma } from '../config/prismaClient';

export const createProduct = async (
  name: string,
  description: string,
  picture: string,
  price: number,
  brandsId: number,
  available: boolean
) => {
  try {
    const newProduct = await prisma().products.create({
      data: {
        name: name,
        description: description,
        picture: picture,
        price: price,
        brandsId: brandsId,
        available: available,
      },
    });
    return newProduct;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getAllProducts = async () => {
  try {
    const products = await prisma().products.findMany({
      where: {
        deleted_at: null,
      },
    });
    return products;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getProductById = async (id: number) => {
  try {
    const product = await prisma().products.findUnique({
      where: {
        id: id,
      },
    });
    return product;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const updateProduct = async (
  id: number,
  name: string,
  description: string,
  picture: string,
  price: number,
  brandsId: number,
  available: boolean
) => {
  try {
    const productUpdated = await prisma().products.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        description: description,
        picture: picture,
        price: price,
        brandsId: brandsId,
        available: available,
      },
    });
    return productUpdated;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const deleteProductById = async (id: number) => {
  try {
    await prisma().products.delete({
      where: {
        id: id,
      },
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};
