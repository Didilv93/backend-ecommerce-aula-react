import { logger } from '../config/logger';
import obterIdLog from '../shared/utils/GetIdLog';
import ProductModel from './ProductModel';
import IProductsBLL from './IProductsBLL';
import ProductsRepository from './ProductsRepository';

export default class ProductsBLL implements IProductsBLL {
  private productsRepository: ProductsRepository;

  constructor(productsRepository: ProductsRepository) {
    this.productsRepository = productsRepository;
  }

  getProducts(): Promise<Array<ProductModel>> {
    return new Promise(async (resolve: Function, reject: Function) => {
      try {
        resolve(await this.productsRepository.getProducts());
      } catch (erro) {
        logger.error('Erro ao buscar produtos', obterIdLog(), erro);
        reject(erro);
      }
    });
  }
}
