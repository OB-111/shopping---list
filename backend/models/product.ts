import { DataTypes, Sequelize, Model, Optional } from 'sequelize';

interface ProductAttributes {
    id : number;
    name: string;
    category: string;
    quantity: number;
}

interface ProductCreationAttributes extends Optional<ProductAttributes, 'id'> {}


class Product extends Model<ProductAttributes,ProductCreationAttributes> implements ProductAttributes{
    public id!: number;
    public name!: string;
    public category!: string;
    public quantity!: number;
}


export const ProductFactory = (sequelize: Sequelize): typeof Product => {
    Product.init(
        {
            id:{
                type:DataTypes.INTEGER,
                autoIncrement:true,
                primaryKey:true
            },
            name:{
                type: new DataTypes.STRING(128),
                allowNull: false
            },
            category:{
                type: new DataTypes.STRING(128),
                allowNull: false
            },
            quantity:{
                type:DataTypes.INTEGER,
                allowNull: false
            }
        },{
            // tableName:'products',
            tableName:'shopping_list',

            sequelize,
        }
    )
    
    return Product;
}