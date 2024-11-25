import { IOption } from "./option.interface";
import { IProduct } from "./product.interface";

export interface ICartItem {
    id: string;
    quantity: number;
    item: IProduct;
    options: IOption[];
}
