import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../config/prismaClient';
import { getConfig } from '../config/config';
import { loginResponse } from '../config/types';

export const login = async (
  email: string,
  password: string,
  role: any
): Promise<loginResponse> => {
  try {
    const user = await prisma().users.findUnique({ where: { email: email } });
    if (user === null) {
      throw new Error('User not found');
    }
    const result = await bcrypt.compare(password, user.password);

    if (result) {
      const accessToken = jwt.sign(
        { email: email, userId: user.id, role: user.role },
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
      return {
        accessToken: accessToken,
        refreshToken: refreshToken,
        id: user.id,
        name: user.name,
        lastname: user.lastname,
        email: user.email,
      };
    } else {
      throw new Error('Invalid password');
    }
  } catch (err) {
    throw new Error('Login failed: ' + err);
  }
};

export const register = async (
  name: string,
  lastname: string,
  email: string,
  password: string,
  role: any
): Promise<any> => {
  // validar que el email no exista!
  const hash = await bcrypt.hash(password, 10);
  try {
    const user = await prisma().users.create({
      data: {
        name: name,
        lastname: lastname,
        email: email,
        password: hash,
        role: role,
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
      return {
        accessToken: accessToken,
        refreshToken: refreshToken,
        id: user.id,
        name: user.name,
        lastname: user.lastname,
        email: user.email,
      };
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

export const getUserById = async (id: number) => {
  try {
    const user = await prisma().users.findUnique({
      where: {
        id: id,
      },
    });
    return user;
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

export async function deleteUserByUserId(id: number) {
  try {
    await prisma().users.delete({
      where: {
        id: id,
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const updateUser = async (
  id: number,
  name: string,
  lastname: string,
  email: string
) => {
  try {
    const userUpdated = await prisma().users.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        lastname: lastname,
        email: email,
      },
    });
    return userUpdated;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const forgotPassword = async (email: string, newPassword: string) => {
  try {
    const passwordHashed = await bcrypt.hash(newPassword, 10); // Aplicar hash de bcrypt a la nueva contraseña

    console.log('Updating password for email:', email);
    console.log('New password:', newPassword);

    const passwordUpdated = await prisma().users.update({
      where: {
        email: email,
      },
      data: {
        password: passwordHashed, // Usar la contraseña hasheada
      },
    });

    console.log('Password updated successfully:', passwordUpdated);

    return passwordUpdated;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
