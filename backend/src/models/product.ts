import { DataTypes, Sequelize, Model, Optional } from "sequelize";

// defines the shape of the attributes for the Product model.
interface ProductAttributes {
  id: number;
  name: string;
  category: string;
  quantity: number;
}

// interface for creating new Product ,'id' is optional when creating a new product since it will be auto-incremented by the database.
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
      sequelize,
    },
  );

  return Product;
};
