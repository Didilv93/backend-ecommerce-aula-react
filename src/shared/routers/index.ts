import { Router } from 'express';
import UsersController from '../../users/UsersController';
import ProductsController from '../../products/ProductsController';
import logManager from '../middleware';

const usersController = new UsersController();
const productsController = new ProductsController();

const routers = Router();

routers.post('/user/', logManager, usersController.getUser);
routers.put('/user/register/', logManager, usersController.registerUser);
routers.get('/products/', logManager, productsController.getProducts);

export { routers };
