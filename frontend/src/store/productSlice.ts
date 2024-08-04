import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

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

export const getProducts = createAsyncThunk('/products/get',async()=>{
    try {
        const res = await axios.get<Product[]>('http://localhost:4000/api/products');
        return res.data;
    } catch (error) {
        toast.error('Error get products')
    }
});

// Async thunk to save products (finish order)
export const saveProducts = createAsyncThunk<Product[] | undefined, Product[]>(
    'products/save',
    async (products: Product[]) => {
        try {
            await axios.post('http://localhost:4000/api/products/update', products);
            return products;
        } catch (error) {
            toast.error("Error saving products");
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
            if (productIndexToDelete >=0) {
                state.products.splice(productIndexToDelete,1)
                state.total -= productToDelete.quantity;
        }
    }
},
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.fulfilled, (state,action) => {
                state.loading = false;
                state.products = action.payload || [];
                state.total = action.payload?.length  || 0;
            })
            .addCase(getProducts.rejected, (state) => {
                state.loading = false;
                state.products = [];
                state.total = 0;

            })
            .addCase(getProducts.pending, (state) => {
                state.loading = true;
            });
    },
});

export const {addProduct,deleteProduct} = productSlice.actions;
export default productSlice.reducer;
