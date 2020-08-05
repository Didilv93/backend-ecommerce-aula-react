export default class ProductModel {
  public id: string;
  public name: string | undefined;
  public description: string | undefined;
  public price: number;
  public previousPrice: number | undefined;
  public ratings: Array<Object> | undefined;
  public image: string | undefined;

  constructor(product: ProductModel = {} as ProductModel) {
    const {
      id,
      name = undefined,
      description = undefined,
      price,
      previousPrice = undefined,
      ratings = undefined,
      image,
    } = product;

    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.previousPrice = previousPrice;
    this.ratings = ratings;
    this.image = image;
  }
}
