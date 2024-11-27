import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TabStackParamList } from "./Tab.type";
import { IProduct } from "../../interfaces";
import { ICartItem } from "../../interfaces/cart-item.interface";

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
    feedback: undefined;
    paymentSuccess: undefined;
    paymentFailed: undefined;
};

export type PropsNavigate<NavigationName extends keyof NavigationStackParamList> =
    NativeStackScreenProps<NavigationStackParamList, NavigationName>;
