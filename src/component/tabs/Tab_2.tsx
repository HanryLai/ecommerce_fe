import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, View } from "react-native";
import { PropsTab, TabStackParamList } from "../../utils/types";
type Props = NativeStackScreenProps<TabStackParamList, "Tab_2">;
export const Tab_2 = ({ navigation, route }: PropsTab<"Tab_2">) => {
    return (
        <View>
            <Text>Tab_2</Text>
        </View>
    );
};
