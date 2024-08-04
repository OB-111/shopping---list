import {configureStore} from '@reduxjs/toolkit';
import productReducer from './productSlice';


const store = configureStore({
    reducer: {
        product : productReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;