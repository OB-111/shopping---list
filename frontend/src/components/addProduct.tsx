import { Button, MenuItem, TextField ,Grid,Box} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, saveProducts } from "../store/productSlice";
import { AppDispatch, RootState } from "../store";


const categories = ['ירקות ופירות' , 'מוצרי ניקיון' , 'מאפים' , 'בשר ודגים'];

const AddProduct: React.FC = () => {

    const [name,setName]= useState('');
    const [category,setCategory]= useState('');
    // const dispatch= useDispatch();
    const products = useSelector((state: RootState) => state.product.products); // Access state from Redux
    const dispatch: AppDispatch = useDispatch(); // Type dispatch with AppDispatch


    const handelAddProduct = () =>{
        if(name && category){
            dispatch(addProduct({name, category}));
            // dispatch(saveProducts([{name:'fhjeksdl',category:'ds',quantity:1}]));
            saveProducts(products)
            setName('');
            setCategory('');
        }
    }

    return (
    <div>

         <Box sx={{ mt: 2 }}>
            <Grid container spacing={2} justifyContent="center">
                <Grid item>
                    <TextField
                        label="מוצר"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        select
                        label="קטגוריה"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        style={{ minWidth: 200 }}
                    >
                        {categories.map((option) => (
                            <MenuItem key={option} value={option} autoFocus= {true}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item>
                    <Button variant= "contained" onClick={handelAddProduct}>
                        הוסף
                    </Button>
                </Grid>
            </Grid>
        </Box>
    </div>);
}

export default AddProduct;