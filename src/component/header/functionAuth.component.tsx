import { StyleSheet, Text, View } from "react-native";
import { PropsNavigate } from "../../utils/types";

export const FunctionAuth = ({ navigation, route }: PropsNavigate<"functionAuth">) => {
    return (
        <View>
            <Text>SideBarAvatar</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    // container: {
    //     position: "absolute",
    //     justifyContent: "space-between",
    //     width: 200,
    //     height: 200,
    //     backgroundColor: Color.primary,
    //     opacity: 0.6,
    //     zIndex: 900099,
    //     right: -100,
    //     top: 50,
    // },
});
