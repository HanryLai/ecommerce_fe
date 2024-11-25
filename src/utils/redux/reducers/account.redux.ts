import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAccountEntity, IDetailInformationEntity } from "../../../interfaces";
import api from "../../axios/apiCuaHiu";

export const AccountSlice = createSlice({
    name: "account",
    initialState: {
        value: {} as IAccountEntity,
        status: "off",
        error: {},
        detail: {} as IDetailInformationEntity,
    },
    reducers: {
        login: (state, value: PayloadAction<IAccountEntity>) => {
            state.value = value.payload;
        },
        logout: (state) => {
            state.value = {} as IAccountEntity;
            state.detail = {} as IDetailInformationEntity;
        },
        saveDetail: (state, value: PayloadAction<IDetailInformationEntity>) => {
            state.detail = value.payload;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchAccountById.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchAccountById.fulfilled, (state, action: PayloadAction<IAccountEntity>) => {
                state.status = "succeeded";
                state.value = action.payload;
            })
            .addCase(fetchAccountById.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || { message: "Failed to fetch account" };
            });
    },
});

export const fetchAccountById = createAsyncThunk("account/fetchAccountById", async (id: string) => {
    const response = await api.get(`/account/${id}`);
    return response.data;
});

export const { login, logout } = AccountSlice.actions;
