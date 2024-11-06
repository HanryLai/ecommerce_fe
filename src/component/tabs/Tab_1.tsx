import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, TouchableOpacity, View } from "react-native";
import { PropsTab, TabStackParamList } from "../../utils/types";

export const Tab_1 = ({ navigation, route }: PropsTab<"Tab_1">) => {
    return (
        <View>
            <TouchableOpacity>
                <Text>Tab_1</Text>
            </TouchableOpacity>
        </View>
    );
};
