import { Request, Response } from 'express';
import {
  deleteUserByEmail,
  getAllUsers,
  refreshToken,
  register,
  login,
  deleteUserByUserId,
  getUserById,
  updateUser,
  forgotPassword,
} from './authLogic';
import { prisma } from '../config/prismaClient';

export const getAllUsersController = async (req: Request, res: Response) => {
  try {
    const result = await getAllUsers();
    console.log(result);
    res.json(result);
  } catch (error: any) {
    res.status(500).send(error);
    return;
  }
};

export const getUserByIdController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await getUserById(+id);
    if (result) {
      res.json(result);
      return;
    }
    res.status(404).json({
      message: `El usuario con el id ${id} no puede mostrarse porque no existe.`,
    });
    return;
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUserByEmailController = async (
  req: Request,
  res: Response
) => {
  try {
    const { email } = req.params;
    await deleteUserByEmail(email);
    res.send('Usuario eliminado con éxito');
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUserByUserIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    await deleteUserByUserId(+id);
    res.send('Usuario eliminado con éxito');
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const registerController = async (req: Request, res: Response) => {
  const { name, lastname, email, password, role } = req.body;
  try {
    const result = await register(name, lastname, email, password, role);
    console.log('user', result);
    res.json(result);
  } catch (err) {
    console.log('err', err);

    res.status(500).send(err);
    return;
  }
};

export const loginController = async (req: Request, res: Response) => {
  const { email, password, role } = req.body;

  try {
    const result = await login(email, password, role);
    res.json(result);
  } catch (err) {
    res.status(500).send(err);
    return;
  }
};

export const refreshController = async (req: Request, res: Response) => {
  const header = req.headers.authorization;
  if (!header) {
    res
      .status(401)
      .json({ message: 'No autorizado: el token no está presente' });
    return;
  }
  const token = header.split(' ')[1];

  try {
    const result = await refreshToken(token);
    res.json(result);
    return;
  } catch (error) {
    res
      .status(500)
      .json({ message: 'No autorizado: el token no está presente' });
    return;
  }
};

export const updateUserController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { name, lastname, email } = req.body;
    const result = await updateUser(+id, name, lastname, email);
    if (result) {
      res.json(result);
      return;
    }
    res.status(404).json({
      message: `El usuario con el id ${id} no se puede actualizar porque no existe.`,
    });
    return;
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const forgotPasswordController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Verifica si el usuario existe en la base de datos
    const existingUser = await prisma().users.findUnique({
      where: {
        email: email,
      },
    });

    if (!existingUser) {
      // Si no se encuentra un usuario con el email proporcionado, responde con un error 404
      res.status(404).json({
        message: `El email ${email} no está registrado.`,
      });
      return;
    }

    // Si el usuario existe, procede a actualizar la contraseña
    const passwordUpdated = await forgotPassword(email, password);

    if (passwordUpdated) {
      // Contraseña actualizada con éxito
      res.status(200).json({
        message:
          'Contraseña actualizada con éxito. Puede iniciar sesión con su nueva contraseña.',
      });
    } else {
      // Error al actualizar la contraseña
      res.status(500).json({
        message:
          'Hubo un error al actualizar la contraseña. Por favor, inténtelo de nuevo más tarde.',
      });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
