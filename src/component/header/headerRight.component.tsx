import { Button, StyleSheet, TouchableOpacity, View } from "react-native";
import { PropsNavigate } from "../../utils/types";
import { CartSVG } from "../../common/svg/cart";

export const HeaderRight = ({ navigation, route }: PropsNavigate<"homepage">) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate("shoppingCart")}>
                <CartSVG width={32} height={32} />
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
