import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../redux/reducers/category.redux";
import { ShoppingCartSlice } from "./reducers";
import { AccountSlice } from "./reducers/account.redux";
import { counterSlice } from "./reducers/reducer.redux";

export const store = configureStore({
    reducer: {
        counter: counterSlice.reducer,
        categoryReducer: categoryReducer,
        accountReducer: AccountSlice.reducer,
        shoppingCartReducer: ShoppingCartSlice.reducer,
    },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
