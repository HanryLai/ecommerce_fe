import { configureStore } from '@reduxjs/toolkit'
import categoryReducer from '../redux/reducers/category.redux'
import productReducer from '../redux/reducers/product.redux'
import { ShoppingCartSlice } from './reducers'
import { AccountSlice } from './reducers/account.redux'
import { counterSlice } from './reducers/reducer.redux'
import categorySlice from '../redux/reducers/category.redux'
import productSlice from '../redux/reducers/product.redux'

export const store = configureStore({
	reducer: {
		counter: counterSlice.reducer,
		categoryReducer: categorySlice.reducer,
		accountReducer: AccountSlice.reducer,
		shoppingCartReducer: ShoppingCartSlice.reducer,
		productReducer: productSlice.reducer,
	},
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store
