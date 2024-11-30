// reducers/order.redux.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import axios from 'axios'
import { Order } from '../../types/type/order.type'

// Tạo slice cho order
const orderSlice = createSlice({
	name: 'order',
	initialState: {
		value: [] as Order[], // Danh sách order
		selectedorder: null as Order | null, // order đã chọn
	},
	reducers: {
		selectorder: (state, action) => {
			state.selectedorder = action.payload
		},
		storeorder: (state, action) => {
			state.value = action.payload
		},
	},
})

// Xuất reducer của slice này
export const { selectorder } = orderSlice.actions

export default orderSlice // Đây chính là orderReducer mà bạn cần
