import { Router } from 'express';
import * as controllers from '../auth/authController';

export const authRouter = Router();

// get users
authRouter.get('/users', controllers.getAllUsersController);

// register
authRouter.post('/register', controllers.registerController);

// login
authRouter.post('/login', controllers.loginController);

// refresh
authRouter.post('/refresh', controllers.refreshController);

// delete
authRouter.delete('/delete/:email', controllers.deleteUserController);
