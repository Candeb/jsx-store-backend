import { Request, Response, NextFunction } from 'express';

// AUTORIZACION ADMIN

export const authAdminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.locals.userId && res.locals.userId === 8) {
    next();
    return;
  }

  res.status(403).json({ message: 'No autorizado: es necesario ser admin' });
};
