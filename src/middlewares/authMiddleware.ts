import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { getConfig } from '../config/config';

// AUTENTICACIÓN
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers.authorization;

  if (!header) {
    return res
      .status(401)
      .json({ message: 'No autorizado: no se encontró el token' });
  }

  const token = header.split(' ')[1];

  try {
    const data = jwt.verify(token, getConfig().accesTokenSecret);

    if (data) {
      res.locals.email = (data as any).email;
      res.locals.userId = (data as any).userId;
      next();
    } else {
      res.status(401).json('No autorizado: el token no es válido');
    }
  } catch (err: any) {
    if (err.name === 'TokenExpiredError') {
      res.status(401).json('No autorizado: el token expiró');
    } else {
      res.status(401).json('No autorizado: el token no es válido');
    }
  }
};
