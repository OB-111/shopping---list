import { DataTypes, Sequelize, Model } from 'sequelize';

// defines the shape of the attributes for the Category model.
interface CategoryAttributes {
    id?: number;
    name: string;
}

// class representing the Category model
class Category extends Model<CategoryAttributes> implements CategoryAttributes {
    public id!: number;
    public name!: string;
}

//  initializes and returns the Category model
export const CategoryFactory = (sequelize: Sequelize): typeof Category => {
    Category.init(
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
        },
        {
            tableName: 'categories',
            sequelize,
        }
    );

    return Category;
};
export default Category; // Export as default
