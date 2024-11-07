import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "./reducers/reducer.redux";
import { CategorySlice } from "./reducers/category.redux";

export const store = configureStore({
    reducer: {
        counter: counterSlice.reducer,
        categoryReducer: CategorySlice.reducer,
    },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
