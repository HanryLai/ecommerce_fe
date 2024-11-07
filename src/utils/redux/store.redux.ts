import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "./reducers/reducer.redux";
import { CategorySlice } from "./reducers/category.redux";
import { AccountSlice } from "./reducers/account.redux";
import { ShoppingCart } from "../../component/shopping-cart/shopping-cart.component";
import { ShoppingCartSlice } from "./reducers";

export const store = configureStore({
    reducer: {
        counter: counterSlice.reducer,
        categoryReducer: CategorySlice.reducer,
        accountReducer: AccountSlice.reducer,
        shoppingCartReducer: ShoppingCartSlice.reducer,
    },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
