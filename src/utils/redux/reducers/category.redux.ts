import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store.redux";
import { CategoryType } from "../../types/type/category.type";

export const CategorySlice = createSlice({
    name: "category",
    initialState: {
        value: [] as unknown as CategoryType,
        chose: null,
    },
    reducers: {
        show: (state) => {
            state.value = {
                id: "123",
                name: "!23",
                image: "123",
            };
        },
        chose: (state) => {
            // state.chose = {}
        },
    },
});

export const { show } = CategorySlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCategory = (state: RootState) => state.counter.value;
