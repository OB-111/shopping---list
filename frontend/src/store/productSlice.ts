import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

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
  isDataPresent: boolean; // this state is to track data presence
  orderFinished: boolean; // this flag for check if needed to save data
}

const initialState: ProductState = {
  products: [],
  total: 0,
  loading: false,
  isDataPresent: false, // Initialize as false
  orderFinished: false, // Initialize as false

};
// Async thunk to check if data exists
export const checkIfDataExists = createAsyncThunk(
  "products/checkIfDataExists",
  async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/products");
      return res.data.length > 0;
    } catch (error) {
      toast.error("Error checking data existence");
      throw error; // Make sure to propagate errors
    }
  }
);

// Async thunk to delete saved list
export const deleteSavedList = createAsyncThunk(
  "products/deleteSavedList",
  async () => {
    try {
      await axios.post("http://localhost:4000/api/products/delete");
    } catch (error) {
      toast.error("Error deleting saved list");
      throw error; // Make sure to propagate errors
    }
  }
);

export const getProducts = createAsyncThunk("/products/get", async () => {
  try {
    const res = await axios.get<Product[]>(
      "http://localhost:4000/api/products",
    );
    return res.data;
  } catch (error) {
    toast.error("Error get products");
  }
});

// Async thunk to save products (finish order)
export const saveProducts = createAsyncThunk<Product[] | undefined, Product[]>(
  "products/save",
  async (products: Product[]) => {
    try {
      await axios.post("http://localhost:4000/api/products/update", products);
      return products;
    } catch (error) {
      toast.error("Error saving products");
    }
  },
);


const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {

    addProduct: (
      state,
      action: PayloadAction<{
        name: string;
        category: string;
        quantity: number;
      }>,
    ) => {
      const productIndexToDelete = state.products.findIndex(
        (product) =>
          product.name === action.payload.name &&
          product.category === action.payload.category,
      );
      const { name, category } = action.payload;
      const existingProduct = state.products[productIndexToDelete];
      existingProduct
        ? (existingProduct.quantity = (existingProduct.quantity || 0) + 1)
        : state.products.push({ name, category, quantity: 1 });
      state.total += 1;
      state.orderFinished = false; 

    },

    deleteProduct: (
      state,
      action: PayloadAction<{
        name: string;
        category: string;
        quantity: number;
      }>,
    ) => {
      const { name, category } = action.payload as {
        name: string;
        category: string;
      };
      const productIndexToDelete = state.products.findIndex(
        (product) => product.name === name && product.category === category,
      );
      const productToDelete = state.products[productIndexToDelete];
      if (productIndexToDelete >= 0) {
        state.products.splice(productIndexToDelete, 1);
        state.total -= productToDelete.quantity;
      }
      state.orderFinished = false; 

    },

    finishOrder: (state) => {
      state.orderFinished = true;
    },
    
    resetOrder: (state) => {
      state.products = [];
      state.total = 0;
      state.orderFinished = false;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(getProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload || [];
      state.total =
        action.payload?.reduce(
          (acc, current) => (acc += current.quantity),
          0,
        ) || 0;
        state.isDataPresent = state.products.length > 0;

    })

    .addCase(getProducts.rejected, (state) => {
      state.loading = false;
      state.products = [];
      state.total = 0;
      state.isDataPresent = false;

    })

    .addCase(getProducts.pending, (state) => {
      state.loading = true;

    }).addCase(checkIfDataExists.fulfilled, (state, action) => {
      state.isDataPresent = action.payload;
    })

    .addCase(deleteSavedList.fulfilled, (state) => {
      state.isDataPresent = false; // Data is deleted from db
      state.products = [];
      state.total = 0;
      state.orderFinished = false; // Reset to false after deletion
    });
  },
});

export const { addProduct, deleteProduct,finishOrder, resetOrder } = productSlice.actions;
export default productSlice.reducer;
