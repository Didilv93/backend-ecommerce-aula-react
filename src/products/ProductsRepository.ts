import ProductModel from './ProductModel';
import IProductsRepository from './IProductsRepository';

import RepositoryException from '../shared/exception/RepositoryException';
import { INSERT_ERROR } from '../shared/repository/constants';

'use strict';
const fs = require('fs');

export default class ProductRepository implements IProductsRepository {
  getProducts(): Promise<any> {
    return new Promise(async (resolve: Function, reject: Function) => {
      try {
        if (fs.existsSync(`./dataSource/${process.env.DATABASE_PRODUCTS_FILE_NAME}.json`)) {
          await fs.readFile(
            `./dataSource/${process.env.DATABASE_PRODUCTS_FILE_NAME}.json`,
            'utf8',
            (err, data) => {
              if (err) throw err;
              const products: ProductModel = JSON.parse(data);
              resolve(products);
            }
          );
        } else {
          throw 'Erro au buscar produtos';
        }
      } catch (error) {
        reject(
          new RepositoryException(
            INSERT_ERROR.code,
            INSERT_ERROR.message('Erro au buscar produtos'),
            error
          )
        );
      }
    });
  }
}
