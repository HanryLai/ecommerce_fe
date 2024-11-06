import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Category } from "../../component/tabs";

export type TabStackParamList = {
    Tab_2: undefined;
    TabRoot: undefined;
    Home: undefined;
};

export type PropsTab<RouteName extends keyof TabStackParamList> = NativeStackScreenProps<
    TabStackParamList,
    RouteName
>;
