// reducers/category.redux.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { CategoryType } from '../../types/type/category.type'
import axios from 'axios'

// Tạo slice cho category
const categorySlice = createSlice({
	name: 'category',
	initialState: {
		value: [] as CategoryType[], // Danh sách category
		selectedCategory: null as CategoryType | null, // Category đã chọn
	},
	reducers: {
		selectCategory: (state, action) => {
			state.selectedCategory = action.payload
		},
		storeCategory: (state, action) => {
			state.value = action.payload
		},
	},
})

// Xuất reducer của slice này
export const { selectCategory } = categorySlice.actions

export default categorySlice // Đây chính là categoryReducer mà bạn cần
