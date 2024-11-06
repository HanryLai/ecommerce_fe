import { NavigationProp, RouteProp } from "@react-navigation/native";

export type Props = {
    navigation: NavigationProp<PropsData>;
};

export type PropsData = {
    homepage: {
        id: string;
        username: string;
    };
    login: {
        name: string;
    };
};
