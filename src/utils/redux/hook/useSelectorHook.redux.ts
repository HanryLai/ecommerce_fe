import { RootState } from "../store.redux";

/**
 * Ex:
 * useDispatcher
 * export const valueABC = (e:RootState)=>e.reducerName.value
 */
export const sample = (e: RootState) => e.counter.value;
export const accountHook = (e: RootState) => e.accountReducer.value;
export const accountHook_status = (e: RootState) => e.accountReducer.status;
export const accountHook_error = (e: RootState) => e.accountReducer.error;
export const shoppingCartHook = (e: RootState) => e.shoppingCartReducer.value;
export const selectProduct = (e: RootState) => e.productReducer.value;
export const storeCategories = (e: RootState) => e.categoryReducer.value;
export const selectedCategory = (e: RootState) => e.categoryReducer.selectedCategory;
