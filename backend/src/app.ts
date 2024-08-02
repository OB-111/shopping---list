import express from 'express';
import bodyParser from 'body-parser';
import productRoutes from '../routes/productRoute';
import { sequelize } from '../models';

const app = express();

app.use(bodyParser.json());

app.use('/api', productRoutes);

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
