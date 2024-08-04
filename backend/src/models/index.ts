import { Sequelize } from 'sequelize';
import { ProductFactory } from './product';
import { CategoryFactory } from './category';

import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME!,
    process.env.DB_USER!,
    process.env.DB_PASSWORD!,
    {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        dialect: process.env.DB_DIALECT as 'mssql',
        dialectOptions: {
            options: {
                encrypt: true, 
                trustServerCertificate: true, 
                serverName: process.env.DB_SERVER_NAME 
            }
        },
        logging: process.env.NODE_ENV === 'development' ? console.log : false // Enable logging in development only
    }
);
const Product = ProductFactory(sequelize);
const Category = CategoryFactory(sequelize);
export { sequelize, Product,Category };
