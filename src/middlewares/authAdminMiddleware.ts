import { Request, Response, NextFunction } from 'express';

// AUTORIZACION ADMIN

export const authAdminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.locals.role && res.locals.role === 'ADMIN') {
    next();
    return;
  }

  res.status(403).json({ message: 'No autorizado: es necesario ser admin' });
};
