// import { sequelize } from './models';
// import app from './app';

// const PORT = process.env.PORT || 4000;



// sequelize.sync({ force: true }).then(async () => {
//     const Category = (await import('./models/category')).default;
//     await Category.bulkCreate([
//         { name: 'מוצרי ניקיון' },
//         { name: 'ירקות ופירות' },
//         { name: 'בשר ודגים' },
//         { name: 'מאפים' },
//         { name: 'גבינות' },
//     ]);
//     app.listen(PORT, () => {
//         console.log(`Server is running on port ${PORT}`);
//     });
//     });
