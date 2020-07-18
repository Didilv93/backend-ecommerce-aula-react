import { Router } from 'express';
import UsersController from '../../users/UsersController';
import logManager from '../middleware';

const usersController = new UsersController();

const routers = Router();

routers.post('/user/', logManager, usersController.getUser);
routers.put('/user/register/', logManager, usersController.registerUser);

export { routers };
