import React, { useEffect } from "react";
import "./App.css";
import AddProduct from "./components/addProduct";
import { Box, Container, Typography } from "@mui/material";
import ProductList from "./components/productList";
import TotalProducts from "./components/totalProducts";
import { useDispatch } from "react-redux";
import { getProducts } from "./store/productSlice";
import { AppDispatch } from "./store";

function App() {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <Container>
      <Box sx={{ textAlign: "center", my: 4 }}>
        <Typography variant="h4">רשימת קניות</Typography>
      </Box>
      <TotalProducts />
      <AddProduct />
      <Typography variant="body2" sx={{ mt: 2, mb: 4, textAlign: "center" }}>
        יש לאסוף מוצרים אלו במחלקות המתאימות
      </Typography>
      <ProductList />
    </Container>
  );
}

export default App;
