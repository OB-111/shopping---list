import { Sequelize } from 'sequelize';
import { ProductFactory } from './product';
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
                encrypt: true, // Use encryption for Cloud SQL
                trustServerCertificate: true, // Trust the self-signed certificate
                serverName: 'zeta-bebop-431208-v6:me-west1:shopping-list' // Optional: Use the instance connection name instead of IP
            }
        },
        logging: process.env.NODE_ENV === 'development' ? console.log : false // Enable logging in development only
    }
);
const Product = ProductFactory(sequelize);

export { sequelize, Product };
