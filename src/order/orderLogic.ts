import { prisma } from '../config/prismaClient';

export const createOrder = async (
  userId: number,
  productsIds: number[],
  name: string,
  description: string,
  price: number,
  picture: string,
  brandsId: number
) => {
  try {
    const orderCreated = await prisma().orders.create({
      data: {
        userId: userId,
        products: {
          create: productsIds.map((productId) => ({
            product: {
              connect: {
                id: productId,
                name: name,
                description: description,
                price: price,
                picture: picture,
                brandsId: brandsId,
              },
            },
          })),
        },
      },
    });
    return orderCreated;
  } catch (err) {
    throw err;
  }
};

export const getAllOrders = async () => {
  try {
    const orders = await prisma().orders.findMany({
      where: {
        deleted_at: null,
      },
      include: {
        products: true,
      },
    });
    return orders;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getOrderById = async (id: number) => {
  try {
    const order = await prisma().orders.findUnique({
      where: {
        id: id,
      },
      include: {
        products: true,
      },
    });
    return order;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export async function getAllOrdersByUserId(id: number) {
  try {
    const ordersByUserId = await prisma().users.findMany({
      where: {
        id: id,
      },
      select: {
        orders: {
          include: {
            products: true,
          },
        },
      },
    });
    return ordersByUserId;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getActiveOrdersByUserId(id: number) {
  try {
    const ordersByUserId = await prisma().users.findMany({
      where: {
        id: id,
      },
      select: {
        orders: {
          where: {
            deleted_at: null,
          },
          include: {
            products: true,
          },
        },
      },
    });
    return ordersByUserId;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const deleteOrderById = async (id: number) => {
  try {
    await prisma().orders.delete({
      where: {
        id: id,
      },
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};
