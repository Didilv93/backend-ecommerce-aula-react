import { Request, Response } from 'express';

import ProductsBLL from './ProductsBLL';
import ProductsRepository from './ProductsRepository';
import ProductModel from './ProductModel';
import BaseController from '../shared/controllers/BaseController';

export default class Controller extends BaseController {
  constructor() {
    super();
  }

  getLib(): ProductsBLL {
    return new ProductsBLL(new ProductsRepository());
  }

  getProducts = async (req: Request, res: Response) => {
    try {
      const productsBLL = this.getLib();
      const products: Array<ProductModel> = await productsBLL.getProducts();
      if (!products) res.status(404).json(products);
      return res.status(200).json(products);
    } catch (error) {
      this.retornoErro(error, res);
    }
  };
}
