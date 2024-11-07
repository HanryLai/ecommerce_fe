import { RootState } from "../store.redux";

/**
 * Ex:
 * useDispatcher
 * export const valueABC = (e:RootState)=>e.reducerName.value
 */
export const sample = (e: RootState) => e.counter.value;
export const categoryHook = (e: RootState) => e.categoryReducer.value;
export const categoryHook2 = (e: RootState) => e.categoryReducer.chose;
export const accountHook = (e: RootState) => e.accountReducer.value;
export const shoppingCartHook = (e: RootState) => e.shoppingCartReducer.value;
