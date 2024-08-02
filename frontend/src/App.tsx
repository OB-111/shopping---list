import React from 'react';
import './App.css';
import AddProduct from './components/addProduct';
import { Box, Container, Typography } from '@mui/material';
import ProductList from './components/productList';
import TotalProducts from './components/totalProducts';

function App() {
  return (
    <Container>
    <Box sx={{ textAlign: 'center', my: 4 }}>
        <Typography variant="h4">רשימת קניות</Typography>
    </Box>
    <TotalProducts />
    <AddProduct />
    <Typography variant="body2" sx={{ mt: 2, mb: 4, textAlign: 'center' }}>
        יש לאסוף מוצרים אלו במחלקות המתאימות
    </Typography>
    <ProductList />
</Container>
  );
}

export default App;
