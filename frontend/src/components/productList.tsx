import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import {
  Grid,
  Typography,
  CardContent,
  Card,
  Button,
  Box,
  IconButton,
  Divider 
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast, ToastContainer } from "react-toastify";
import { deleteProduct, Product } from "../store/productSlice";
import { DeleteOutlined } from "@mui/icons-material";

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
    <Box sx={{ mt: 4 }}>
      <Grid container spacing={2} justifyContent="center">
        {Object.keys(categorizedProducts).map((category) => (
          <Grid item key={category} xs={12} md={6} lg={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>{category}</Typography>
                <Divider sx={{ mb: 2 }} />
                {categorizedProducts[category].map((product: any, index: number) => (
                  <Card 
                    key={`${category}-${product.name}`} 
                    variant="outlined" 
                    sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' ,boxShadow: 3, // Adds a default shadow
                      border: '1px solid #b2ebf2',     backgroundColor: '#e0f7fa',
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="body1">שם מוצר: {product.name}</Typography>
                      <Typography variant="body2" color="textSecondary">כמות: ({product.quantity})</Typography>
                    </CardContent>
                    <IconButton onClick={() => handleDelete(product)}><DeleteOutlined /></IconButton>
                  </Card>
                ))}
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

