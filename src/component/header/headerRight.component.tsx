import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CartSVG, PersonalSVG } from "../../common/svg";
import { PropsNavigate } from "../../utils/types";
import { useSelector } from "react-redux";
import { AppDispatch, useAppDispatch, useAppSelector } from "../../utils/redux";
import { useState } from "react";

export const HeaderRight = ({ navigation, route }: PropsNavigate<"homepage">) => {
    const selector = useAppSelector((state) => state.accountReducer);
    const dispatch = useAppDispatch<AppDispatch>();
    const [sidebar, setSidebar] = useState<boolean>(false);
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate("shoppingCart")}>
                <CartSVG width={32} height={32} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("login")}>
                {selector.value.url_avatar ? (
                    <TouchableOpacity onPress={() => navigation.navigate("functionAuth")}>
                        <Image
                            style={{ width: 32, height: 32, borderWidth: 2, borderRadius: 50 }}
                            source={{ uri: selector.value.url_avatar }}
                        />
                    </TouchableOpacity>
                ) : (
                    <PersonalSVG width={32} height={32} />
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
