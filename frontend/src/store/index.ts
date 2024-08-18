// Import necessary functions and modules from Redux Toolkit
import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice"; // Import the product slice reducer

// Configure the Redux store with the product slice reducer and middleware
const store = configureStore({
  // Add reducers to the store
  reducer: {
    // 'product' is a key that maps to the productReducer
    product: productReducer,
  },
  // Configure middleware: getDefaultMiddleware returns the default middleware
  // Adding custom middleware or modifying existing middleware can be done by concatenating here
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});

// Define RootState typeSupport
export type RootState = ReturnType<typeof store.getState>;

// Define AppDispatch type for use in TypeScript (represents the store's dispatch function)
export type AppDispatch = typeof store.dispatch;

// Export the store to be used in the React application
export default store;
