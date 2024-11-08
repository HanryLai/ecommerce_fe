import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import api from "../../axios";
import { RootState } from "../store.redux";

export const ShoppingCartSlice = createSlice({
    name: "shopping-cart",
    initialState: {
        value: {},
        count: 0,
    },
    reducers: {
        get: (value, payload: PayloadAction<string>) => {
            api.get("/shopping-cart/" + payload)
                .then((res) => res.data)
                .then((data) => {
                    console.log("data shopping" + data);
                    value.value = data;
                    // value.count =
                })
                .catch((err) => {
                    console.log("err" + err);
                    alert("Fetch data shopping cart errpr");
                });
        },
    },
});

export const { get } = ShoppingCartSlice.actions;
