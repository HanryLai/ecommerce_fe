import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TabStackParamList } from "./Tab.type";
import { IProduct } from "../../interfaces";
import { ICartItem } from "../../interfaces/cart-item.interface";
import { Order } from "./type/order.type";

export type NavigationStackParamList = {
    homepage: {
        id?: string;
        username?: string;
        screen: keyof TabStackParamList;
    };
    login: undefined;
    register: undefined;
    Tab: undefined;
    main: undefined;
    shoppingCart: {
        productOrder: ICartItem[];
        total: number;
    };
    category: {
        id: string;
    };
    detailInformation: undefined;
    functionAuth: undefined;
    productDetails: {
        id: string;
    };
    PaymentComponent: {
        productOrder: ICartItem[];
        total: number;
    };
    MyOrder: undefined;
    MyComment: undefined;
    feedback: {
        order: Order;
    };
    orders: undefined;
    paymentSuccess: {
        order: any;
        method: number;
    };
    paymentFailed: {
        order: any;
        method: number;
    };
    ChatAdmin: {
        userId: string;
    };
    ListChat: undefined;
};

export type PropsNavigate<NavigationName extends keyof NavigationStackParamList> =
    NativeStackScreenProps<NavigationStackParamList, NavigationName>;
