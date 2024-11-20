import { Option } from "./option.interface";

export interface Product {
    id: string;
    name: string;
    description: string;
    images_url: string;
    price: string;
    quantity: number;
    option: Option[];
}
