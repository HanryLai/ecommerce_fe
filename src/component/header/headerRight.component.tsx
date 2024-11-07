import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CartSVG, PersonalSVG } from "../../common/svg";
import { PropsNavigate } from "../../utils/types";

export const HeaderRight = ({ navigation, route }: PropsNavigate<"homepage">) => {
    return (
        <View style={styles.container}>
            <Text>{route.params?.username || "heh"}</Text>
            <TouchableOpacity onPress={() => navigation.navigate("shoppingCart")}>
                <CartSVG width={32} height={32} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("login")}>
                <PersonalSVG width={32} height={32} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginRight: 20,
    },
});
