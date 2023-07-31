import { Request, Response } from 'express';
import {
  deleteUserByEmail,
  getAllUsers,
  refreshToken,
  register,
  login,
} from './authLogic';

export const getAllUsersController = async (res: Response, req: Request) => {
  try {
    const result = await getAllUsers();
    console.log(result);
    res.json(result);
  } catch (error: any) {
    res.status(500).send(error);
    return;
  }
};

export const deleteUserController = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;
    await deleteUserByEmail(email);
    res.send('Usuario eliminado con éxito');
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const registerController = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    const result = await register(name, email, password);
    console.log('user', result);
    res.json(result);
  } catch (err) {
    console.log('err', err);

    res.status(500).send(err);
    return;
  }
};

export const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const result = await login(email, password);
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
