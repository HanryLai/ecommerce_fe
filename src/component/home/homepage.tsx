import { Text, View } from "react-native";
import { Props } from "../../common/types/props.type";
import { RouteProp } from "@react-navigation/native";

type RootStackParamList = {
    homepage: { id: string; username: string };
};

type PropsData = {
    route: RouteProp<RootStackParamList, "homepage">;
};

export const HomePage = ({ route }: PropsData) => {
    const { id, username } = route.params;
    return (
        <View>
            <Text>
                Welcome <Text style={{ fontSize: 20, color: "#2241b9" }}>{username}</Text> to home
                page
            </Text>
        </View>
    );
};
