// reducers/category.redux.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { CategoryType } from '../../types/type/category.type'
import axios from 'axios'

// Fetch categories from API
export const fetchCategoryList = createAsyncThunk('category/fetchCategoryList', async () => {
	const response = await axios.get<CategoryType[]>(
		'https://6703a656ab8a8f89273107fe.mockapi.io/api/category'
	)
	return response.data // Trả về dữ liệu danh sách category
})

// Tạo slice cho category
const categorySlice = createSlice({
	name: 'category',
	initialState: {
		value: [] as CategoryType[], // Danh sách category
		selectedCategory: null as CategoryType | null, // Category đã chọn
		loading: false,
		error: null as string | null,
	},
	reducers: {
		selectCategory: (state, action) => {
			state.selectedCategory = action.payload
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCategoryList.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(fetchCategoryList.fulfilled, (state, action) => {
				state.value = action.payload // Lưu danh sách category sau khi thành công
				state.loading = false
			})
			.addCase(fetchCategoryList.rejected, (state, action) => {
				state.loading = false
				state.error = action.error.message || 'Failed to fetch categories'
			})
	},
})

// Xuất reducer của slice này
export const { selectCategory } = categorySlice.actions

export default categorySlice.reducer // Đây chính là categoryReducer mà bạn cần
