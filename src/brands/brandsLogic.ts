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
