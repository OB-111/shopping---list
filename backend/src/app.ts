import express from 'express';
import bodyParser from 'body-parser';
import productRoutes from '../routes/productRoutes';
import categoryRoutes from '../routes/categoryRoutes';
import cors from 'cors';
import { sequelize } from '../models';

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes); // Mount categoryRoutes under /api/categories

sequelize.authenticate()
    .then(() => {
        console.log('Database connected');
        return sequelize.sync();
    })
    .then(() => {
        console.log('Database synchronized');
    })
    .catch((err: any) => {
        console.error('Unable to connect to the database:', err);
    });

export default app;

