import { prisma } from '../config/prismaClient';

export const createBrand = async (name: string, picture: string) => {
  try {
    const brandCreated = await prisma().brands.create({
      data: {
        name: name,
        picture: picture,
      },
    });
    return brandCreated;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getBrands = async () => {
  try {
    const brands = await prisma().brands.findMany({});
    return brands;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getBrandById = async (id: number) => {
  try {
    const brand = await prisma().brands.findUnique({
      where: {
        id: id,
      },
    });
    return brand;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export async function getProductsByBrandId(id: number) {
  try {
    const productsByBrandId = await prisma().brands.findMany({
      where: {
        id: id,
      },
      select: {
        products: {
          select: {
            name: true,
            description: true,
          },
        },
      },
    });
    return productsByBrandId;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getProductsByBrandName(name: string) {
  try {
    const productsByBrandName = await prisma().brands.findMany({
      where: {
        name: name,
      },
      select: {
        products: {
          select: {
            name: true,
            description: true,
          },
        },
      },
    });
    return productsByBrandName;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const updateBrand = async (
  id: number,
  name: string,
  picture: string,
) => {
  try {
    const brandUpdated = await prisma().brands.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        picture: picture,
      },
    });
    return brandUpdated;
  } catch (err) {
    console.log(err);
    throw err;
  }
};