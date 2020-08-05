import ProductModel from './ProductModel';

export default interface IProductsBLL {
  getProducts(): Promise<Array<ProductModel>>;
}
