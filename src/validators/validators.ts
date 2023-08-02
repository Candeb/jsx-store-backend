import { validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export function createItemValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const result = validationResult(req);
  if (result.isEmpty()) {
    next();
    return;
  }

  res.status(400).json({ errors: result.array() });
}

export const registerValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: 'Todos los campos son obligatorios.' });
  }
  if (password.length < 5) {
    return res
      .status(400)
      .json({ message: 'La contraseña debe tener más de 5 caracteres' });
  }
  if (!email.includes('@') || !email.includes('.')) {
    return res.status(400).json({ message: 'El email no es válido.' });
  }
  if (name.length < 3) {
    return res
      .status(400)
      .json({ message: 'El nombre debe tener al menos 3 caracteres.' });
  }
  next();
};

export const loginValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: 'Todos los campos son obligatorios.' });
  }
  if (password.length < 5) {
    return res
      .status(400)
      .json({ message: 'La contraseña debe tener más de 5 caracteres' });
  }
  if (!email.includes('@') || !email.includes('.')) {
    return res.status(400).json({ message: 'El email no es válido' });
  }
  next();
};
