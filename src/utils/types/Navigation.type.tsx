import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TabStackParamList } from "./Tab.type";

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
    shoppingCart: undefined;
    category: {
        id: string;
    };
    detailInformation: undefined;
    functionAuth: undefined;
    productDetails: {
        id: string;
    };
};

export type PropsNavigate<NavigationName extends keyof NavigationStackParamList> =
    NativeStackScreenProps<NavigationStackParamList, NavigationName>;
