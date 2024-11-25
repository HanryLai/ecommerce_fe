import { IOption } from "./option.interface";

export interface IProduct {
    id: string;
    name: string;
    description: string;
    image_url: string;
    price: number;
    quantity: number;
    options: IOption[];
}
