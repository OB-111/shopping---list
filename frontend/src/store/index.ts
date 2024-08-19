import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice"; 

// Configure the Redux store with the product slice reducer and middleware
const store = configureStore({
  reducer: {
    product: productReducer,
  },

});

// Define RootState typeSupport & AppDispatch typeSupport 
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
