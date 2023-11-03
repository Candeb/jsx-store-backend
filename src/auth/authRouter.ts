import { Router } from 'express';
import * as controllers from '../auth/authController';
import { authMiddleware } from '../middlewares/authMiddleware';
import * as validators from '../validators/validators';
import { authAdminMiddleware } from '../middlewares/authAdminMiddleware';

export const authRouter = Router();

// libre
authRouter.post(
  '/register',
  validators.registerValidator,
  controllers.registerController
);

authRouter.post(
  '/login',
  validators.loginValidator,
  controllers.loginController
);

authRouter.post('/refresh', authMiddleware, controllers.refreshController);

authRouter.put('/update/:id', controllers.updateUserController);
authRouter.put('/forgot-password', controllers.forgotPasswordController);

authRouter.get(
  '/user/id/:id',
  authMiddleware,
  controllers.getUserByIdController
);

// ADMIN
authRouter.get(
  '/users',
  authMiddleware,
  authAdminMiddleware,
  controllers.getAllUsersController
);

authRouter.delete(
  '/delete/email/:email',
  authMiddleware,
  authAdminMiddleware,
  controllers.deleteUserByEmailController
);
authRouter.delete(
  '/delete/id/:id',
  authMiddleware,
  authAdminMiddleware,
  controllers.deleteUserByUserIdController
);
