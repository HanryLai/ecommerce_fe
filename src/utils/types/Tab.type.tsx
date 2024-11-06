import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type TabStackParamList = {
    Tab_1: undefined;
    Tab_2: undefined;
    TabRoot: undefined;
};

export type PropsTab<RouteName extends keyof TabStackParamList> = NativeStackScreenProps<
    TabStackParamList,
    RouteName
>;
