import { RootState } from "../store.redux";

/**
 * Ex:
 * useDispatcher
 * export const valueABC = (e:RootState)=>e.reducerName.value
 */
export const sample = (e: RootState) => e.counter.value;
export const selectSelectedCategory = (state: RootState) => state.categoryReducer.selectedCategory;
export const accountHook = (e: RootState) => e.accountReducer.value;
export const shoppingCartHook = (e: RootState) => e.shoppingCartReducer.value;
