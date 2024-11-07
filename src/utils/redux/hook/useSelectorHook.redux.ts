import { RootState } from '../store.redux'

/**
 * Ex:
 * useDispatcher
 * export const valueABC = (e:RootState)=>e.reducerName.value
 */
export const sample = (e: RootState) => e.counter.value

// export const categoryHook = (e: RootState) => e.categoryReducer.value;
// export const categoryHook2 = (e: RootState) => e.categoryReducer.chose;
export const selectCategoryList = (state: RootState) => state.categoryReducer.value
export const selectSelectedCategory = (state: RootState) => state.categoryReducer.selectedCategory
