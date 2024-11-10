import { ShoppingCart } from "../component/shopping-cart/shopping-cart.component";
import { OptionList } from "./option-list.interface";

export interface Product {
    id: string;
    name: string;
    description: string;
    images_url: string;
    price: string;
    optionsList: OptionList[];
    quantity: number;
}
