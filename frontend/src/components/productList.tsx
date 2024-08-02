import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { List, ListItem, ListItemText,Grid,Typography,CardContent,Card,Button,} from "@mui/material";
import { deleteProduct } from "../store/productSlice";
import DeleteIcon from '@mui/icons-material/Delete';

const ProductList: React.FC = () => {
    const products = useSelector((state:RootState) => state.product.products);
    const dispatch = useDispatch();

    // initate the Basket by catgories and check if exist
    const categorizedProducts = products.reduce((acc: any, product) => {
        if (!acc[product.category]) {
            acc[product.category] = [];
        }
        acc[product.category].push(product);
        return acc;
    }, {});

    const handleDelete = (name: string, category: string) => {
        dispatch(deleteProduct({ name, category }));
    };

    return (
    // <List>
    //     {products.map((product, index) => (
    //         <ListItem key={index}>
    //             <ListItemText primary = {`${product.name} ${product.quantity}`} secondary = {product.category}/>
    //         </ListItem>
    //     ))}
    // </List>
    <Grid container spacing={2} justifyContent="center">
    {Object.keys(categorizedProducts).map((category) => (
        <Grid item key={category} xs={12} md={6} lg={4}>
            <Card>
                <CardContent>
                    <Typography variant="h6">{category}</Typography>
                    {categorizedProducts[category].map((product: any, index: number) => (
                        <Card >
                        <Typography key={index}>
                            {product.name} ({product.quantity})
                        </Typography>  
                        
                        <Button variant="contained" size="small"  startIcon={<DeleteIcon /> }>Delete</Button>
                        </Card>

                    ))}
                    
                </CardContent>
            </Card>
        </Grid>
    ))}
</Grid>
    );
}

export default ProductList;