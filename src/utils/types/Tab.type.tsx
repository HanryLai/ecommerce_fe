import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Category } from "../../component/tabs";

export type TabStackParamList = {
    Search: undefined;
    TabRoot: undefined;
    Home: undefined;
    Favorite: undefined;
};

export type PropsTab<RouteName extends keyof TabStackParamList> = NativeStackScreenProps<
    TabStackParamList,
    RouteName
>;
