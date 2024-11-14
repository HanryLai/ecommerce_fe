// reducers/product.redux.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import axios from 'axios'
import { ProductType } from '../../types/type/product.type'

// Tạo slice cho product
const productSlice = createSlice({
	name: 'product',
	initialState: {
		value: [] as ProductType[], // Danh sách product
		selectedproduct: null as ProductType | null, // product đã chọn
	},
	reducers: {
		selectproduct: (state, action) => {
			state.selectedproduct = action.payload
		},
		storeproduct: (state, action) => {
			state.value = action.payload
		},
	},
})

// Xuất reducer của slice này
export const { selectproduct } = productSlice.actions

export default productSlice // Đây chính là productReducer mà bạn cần
