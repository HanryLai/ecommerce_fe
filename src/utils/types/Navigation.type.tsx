import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TabStackParamList } from "./Tab.type";
import { Product } from "../../interfaces";

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
        id: string;
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
        productOrder: Product[];
        total: number;
    };
    MyOrder: undefined;
    MyComment: undefined;
    feedback: undefined;
};

export type PropsNavigate<NavigationName extends keyof NavigationStackParamList> =
    NativeStackScreenProps<NavigationStackParamList, NavigationName>;
