import { DataTypes, Sequelize, Model, Optional } from "sequelize";

// defines the shape of the attributes for the Product model.
interface ProductAttributes {
  id: number;
  name: string;
  category: string;
  quantity: number;
}

interface ProductCreationAttributes extends Optional<ProductAttributes, "id"> {}

// class representing the Product model
class Product
  extends Model<ProductAttributes, ProductCreationAttributes>
  implements ProductAttributes
{
  public id!: number;
  public name!: string;
  public category!: string;
  public quantity!: number;
}

//  initializes and returns the Category model
export const ProductFactory = (sequelize: Sequelize): typeof Product => {
  Product.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: new DataTypes.STRING(128),
        allowNull: false,
      },
      category: {
        type: new DataTypes.STRING(128),
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 1,
      },
    },
    {
      tableName: "products",
      // tableName:'shopping_list',
      sequelize,
    },
  );

  return Product;
};
