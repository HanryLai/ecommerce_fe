import { configureStore } from '@reduxjs/toolkit'
import { counterSlice } from './reducers/reducer.redux'
import categoryReducer from './reducers/category.redux'

export const store = configureStore({
	reducer: {
		counter: counterSlice.reducer,
		categoryReducer: categoryReducer,
	},
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store
