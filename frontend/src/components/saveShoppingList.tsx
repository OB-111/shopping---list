import { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Typography, CardContent, Card } from "@mui/material";

const SavedShoppingList: React.FC = () => {
    const [savedProducts, setSavedProducts] = useState<any[]>([]);

    useEffect(() => {
        axios.get('http://localhost:4000/api/products')
            .then(response => setSavedProducts(response.data))
            .catch(error => console.error('Failed to fetch saved products', error));
    }, []);
    

    const categorizedProducts = savedProducts.reduce((acc: any, product) => {
        if (!product.category) return acc; // Ensure product.category is defined
        if (!acc[product.category]) {
            acc[product.category] = [];
        }
        acc[product.category].push(product);
        return acc;
    }, {}as { [key: string]: any[] });

    return (
        <Grid container spacing={2} justifyContent="center">
            {Object.keys(categorizedProducts).map((category) => (
                <Grid item key={category} xs={12} md={6} lg={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">{category}</Typography>
                            {categorizedProducts[category].map((product: any, index: number) => (
                                <Card key={`${category}-${product.name}`}>
                                    <Typography>
                                        {product.name} ({product.quantity})
                                    </Typography>
                                </Card>
                            ))}
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}

export default SavedShoppingList;
