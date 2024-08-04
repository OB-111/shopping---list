import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Product {
    name: string;
    category: string;
    quantity: number;
}
export interface Order {
    id: string;
    products: Product[];
}
interface ProductState {
    
    products: Product[];
    total: number;
    loading: boolean;
}

const initialState: ProductState = {
    products: [],
    total: 0,
    loading: false,

};

// Async thunk to save products (finish order)
export const saveProducts = createAsyncThunk<Product[] | undefined, Product[]>(
    'products/save',
    async (products: Product[]) => {
        try {
            await axios.post('http://localhost:4000/api/products', products);
            return products;
        } catch (error) {
            console.error("Error saving products", error);
        }
    }
);




const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        addProduct : (state, action:PayloadAction<{ name: string; category: string;quantity:number;}>) => {
            const productIndexToDelete = state.products.findIndex(product => product.name === action.payload.name && product.category === action.payload.category);
            const {name,category} = action.payload
            const existingProduct = state.products[productIndexToDelete];
            existingProduct ?
            existingProduct.quantity = (existingProduct.quantity || 0) + 1 :state.products.push({ name,category,quantity:1});
            state.total += 1;
            
        },

        deleteProduct : (state, action:PayloadAction<{ name: string; category: string;quantity:number;}>) => {
            const productIndexToDelete = state.products.findIndex(product => product.name === action.payload.name && product.category === action.payload.category);
            const productToDelete = state.products[productIndexToDelete];
            debugger;
            if (productIndexToDelete >=0) {
                state.products.splice(productIndexToDelete,1)
                state.total -= productToDelete.quantity;
        }
    }
},
    extraReducers: (builder) => {
        builder
            .addCase(saveProducts.fulfilled, (state) => {
                state.loading = false;
                state.products = [];
                state.total = 0 ;
            })
            .addCase(saveProducts.rejected, (state) => {
                state.loading = false;
            })
            .addCase(saveProducts.pending, (state) => {
                state.loading = true;
            });
    },
});

export const {addProduct,deleteProduct} = productSlice.actions;
export default productSlice.reducer;
