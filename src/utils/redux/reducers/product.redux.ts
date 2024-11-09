import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { ProductType } from '../../types/type/product.type'

// Thunk để fetch tất cả products
export const fetchProductList = createAsyncThunk('Product/fetchProductList', async () => {
	const response = await axios.get<ProductType[]>(
		'https://6703a656ab8a8f89273107fe.mockapi.io/api/products'
	)
	return response.data // Trả về danh sách tất cả sản phẩm
})

// Thunk để fetch products theo category ID
export const fetchProductByCategoryId = createAsyncThunk(
	'Product/fetchProductByCategoryId',
	async (categoryId: string) => {
		const response = await axios.get<ProductType[]>(
			`https://6703a656ab8a8f89273107fe.mockapi.io/api/products?categoryId=${categoryId}`
		)
		return response.data // Trả về danh sách sản phẩm của category
	}
)

// Tạo slice cho Product
const ProductSlice = createSlice({
	name: 'Product',
	initialState: {
		value: [] as ProductType[], // Danh sách Product
		selectedProduct: null as ProductType | null, // Product đã chọn
		loading: false,
		error: null as string | null,
	},
	reducers: {
		// Action để chọn một product
		selectProduct: (state, action) => {
			state.selectedProduct = action.payload
		},
	},
	extraReducers: (builder) => {
		builder
			// Xử lý fetchProductList
			.addCase(fetchProductList.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(fetchProductList.fulfilled, (state, action) => {
				state.value = action.payload // Cập nhật danh sách sản phẩm sau khi fetch thành công
				state.loading = false
			})
			.addCase(fetchProductList.rejected, (state, action) => {
				state.loading = false
				state.error = action.error.message || 'Failed to fetch products'
			})

			// Xử lý fetchProductByCategoryId
			.addCase(fetchProductByCategoryId.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(fetchProductByCategoryId.fulfilled, (state, action) => {
				state.value = action.payload // Cập nhật danh sách sản phẩm theo category sau khi fetch thành công
				state.loading = false
			})
			.addCase(fetchProductByCategoryId.rejected, (state, action) => {
				state.loading = false
				state.error = action.error.message || 'Failed to fetch products by category'
			})
	},
})

// Xuất reducer và actions của slice này
export const { selectProduct } = ProductSlice.actions
export default ProductSlice.reducer
