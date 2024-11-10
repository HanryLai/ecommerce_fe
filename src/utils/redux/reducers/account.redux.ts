import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store.redux";
import { IAccountEntity } from "../../../interfaces";

export const AccountSlice = createSlice({
    name: "account",
    initialState: {
        value: {},
    },
    reducers: {
        login: (state, value: PayloadAction<IAccountEntity>) => {
            state.value = value.payload;
        },
        logout: (state) => {
            state.value = {} as IAccountEntity;
        },
    },
});

export const { login, logout } = AccountSlice.actions;
