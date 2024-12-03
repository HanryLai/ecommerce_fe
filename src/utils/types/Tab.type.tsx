import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type TabStackParamList = {
    TabRoot: undefined;
    Home: undefined;
    Favorite: undefined;
    Inbox: undefined;
    Account: undefined;
};

export type PropsTab<RouteName extends keyof TabStackParamList> = NativeStackScreenProps<
    TabStackParamList,
    RouteName
>;
