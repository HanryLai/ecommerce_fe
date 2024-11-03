import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, TouchableOpacity, View } from "react-native";
import { TabStackParamList } from "../../utils/types";
type Props = NativeStackScreenProps<TabStackParamList, "Tab_1">;

export const Tab_1 = ({ navigation, route }: Props) => {
    return (
        <View>
            <TouchableOpacity>
                <Text>Tab_1</Text>
            </TouchableOpacity>
        </View>
    );
};
