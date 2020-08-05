import ProductModel from './ProductModel';

export default interface IProductsRepository {
  getProducts(): Promise<Array<ProductModel>>;
}
