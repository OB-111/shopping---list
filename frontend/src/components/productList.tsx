import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import {
  Grid,
  Typography,
  CardContent,
  Card,
  Button,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast, ToastContainer } from "react-toastify";
import { deleteProduct, Product } from "../store/productSlice";

const ProductList: React.FC = () => {
  const products = useSelector((state: RootState) => state.product.products);
  const dispatch: AppDispatch = useDispatch();

  const categorizedProducts = products.reduce((acc: any, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {});

  const handleDelete = (product: Product) => {
    dispatch(deleteProduct(product));
  };

  return (
    <Box>
      <Grid container spacing={2} justifyContent="center">
        {Object.keys(categorizedProducts).map((category) => (
          <Grid item key={category} xs={12} md={6} lg={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">{category}</Typography>
                {categorizedProducts[category].map(
                  (product: any, index: number) => (
                    <Card key={`${category}-${product.name}`}>
                      <Typography>
                        {product.name} ({product.quantity})
                      </Typography>
                      <Button
                        variant="contained"
                        size="small"
                        startIcon={<DeleteIcon />}
                        onClick={() => handleDelete(product)}
                      >
                        Delete
                      </Button>
                    </Card>
                  ),
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <ToastContainer />
    </Box>
  );
};

export default ProductList;
