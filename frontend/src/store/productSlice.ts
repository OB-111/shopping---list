import {createAsyncThunk, createSlice , PayloadAction} from '@reduxjs/toolkit';
import { saveShoppingList } from '../api';


interface Product  {
    name: string;
    category: string;
    quantity: number;
} 


interface ProductState {
    products: Product[];
    total: number;
}

const initialState: ProductState = {
    products:[],
    total:0
};


export const saveProducts = createAsyncThunk <void, Product[]>(
    'api/save',
    async (products: Product[]) => {
        console.log('check from createAsync');
        
        await saveShoppingList(products);
    }
);
// check if product exist , if the product found increment the quantity , else add a new one.
const productSlice = createSlice({
    name:'product',
    initialState,
    reducers:{

        addProduct : (state, action:PayloadAction<{ name: string; category: string;}>) => {
            const {name, category} = action.payload;
            const existingProduct = state.products.find(product => product.name === name);
            if (existingProduct) {
                existingProduct.quantity +=1;
            }
            else{
                state.products.push({name, category, quantity:1});
            }
            state.total += 1;
        },

        // i thought that it necssary to add delete product option 
        deleteProduct : (state, action:PayloadAction<{ name: string; category: string;}>) => {
            const {name, category} = action.payload;
            const productIndex = state.products.findIndex(product => product.name === name && product.category === category);
            if(productIndex >=0){
                const productToDelete = state.products[productIndex];
                state.total -= productToDelete.quantity;
                state.products.slice(productIndex,1); 
            }
        }
    },    extraReducers: (builder) => {
        builder
            .addCase(saveProducts.fulfilled, (state) => {
                // Handle any state changes if needed after saving
            })
            .addCase(saveProducts.rejected, (state, action) => {
                console.error('Failed to save products:', action.error.message);
            });
    },
});


export const {addProduct,deleteProduct} = productSlice.actions;
export default productSlice.reducer;
