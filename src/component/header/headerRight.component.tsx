import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { CartSVG, PersonalSVG } from "../../common/svg";
import { useAppSelector } from "../../utils/redux";
import { PropsNavigate, TabStackParamList } from "../../utils/types";

export const HeaderRight = ({ navigation, route }: PropsNavigate<"homepage">) => {
    const selector = useAppSelector((state) => state.accountReducer);
    const navigationHook = useNavigation<NavigationProp<TabStackParamList>>();
    function moveToCart() {
        if (Object.keys(selector.value).length !== 0) {
            navigation.navigate("shoppingCart", { id: selector.value.id });
        } else {
            navigation.navigate("login");
        }
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity style={{ marginHorizontal: 16 }} onPress={() => moveToCart()}>
                <CartSVG width={44} height={44} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("login")}>
                {selector.value.url_avatar ? (
                    <TouchableOpacity onPress={() => navigationHook.navigate("Account")}>
                        <Image
                            style={{ width: 44, height: 44, borderWidth: 2, borderRadius: 50 }}
                            source={{ uri: selector.value.url_avatar }}
                        />
                    </TouchableOpacity>
                ) : (
                    <PersonalSVG width={44} height={32} />
                )}
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
