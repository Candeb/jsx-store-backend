import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../config/prismaClient';
import { getConfig } from '../config/config';
import { PrismaClient } from '@prisma/client';
import { User, loginResponse } from '../config/types';

export const login = async (
  email: string,
  password: string
): Promise<loginResponse> => {
  try {
    const user = await prisma().users.findUnique({ where: { email: email } });
    if (user === null) {
      throw new Error('User not found');
    }
    const result = await bcrypt.compare(password, user.password);
    if (result) {
      const accessToken = jwt.sign(
        { email: email, userId: user.id },
        getConfig().accesTokenSecret,
        {
          expiresIn: '1h',
        }
      );
      const refreshToken = jwt.sign(
        { email: email },
        getConfig().refreshTokenSecret,
        {
          expiresIn: '72h',
        }
      );
      return { accessToken: accessToken, refreshToken: refreshToken };
    }
    throw new Error('Invalid password');
  } catch (err) {
    throw err;
  }
};

export const register = async (
  name: string,
  email: string,
  password: string
): Promise<any> => {
  // validar que el email no exista!
  const hash = await bcrypt.hash(password, 10);
  try {
    const user = await prisma().users.create({
      data: {
        name: name,
        email: email,
        password: hash,
      },
    });
    return user;
  } catch (err) {
    throw err;
  }
};

export const refreshToken = async (token: string): Promise<loginResponse> => {
  try {
    const data = jwt.verify(token, getConfig().refreshTokenSecret);
    if (data) {
      const dataparsed = data as unknown as { email: string };

      const user = await prisma().users.findUnique({
        where: { email: dataparsed.email },
      });
      if (user === null) {
        throw new Error('USER NOT FOUND');
      }
      const accessToken = jwt.sign(
        { email: user.email, role: user.role },
        getConfig().accesTokenSecret,
        {
          expiresIn: '1h',
        }
      );
      const refreshToken = jwt.sign(
        { email: user.email },
        getConfig().refreshTokenSecret,
        {
          expiresIn: '72h',
        }
      );
      return { accessToken: accessToken, refreshToken: refreshToken };
    }
  } catch (err: any) {
    if (err.name === 'TokenExpiredError') {
      throw new Error('NOT AUTHORIZED: TOKEN EXPIRED');
    }
    throw new Error('NOT AUTHORIZED: TOKEN NOT VALID');
  }
  throw new Error('NOT AUTHORIZED: TOKEN NOT VALID');
};

export const getAllUsers = async () => {
  try {
    const users = await prisma().users.findMany();
    return users;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export async function deleteUserByEmail(email: string) {
  try {
    await prisma().users.delete({
      where: {
        email: email,
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}
