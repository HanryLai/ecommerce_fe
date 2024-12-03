import { NavigationProp, useFocusEffect, useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
    DeliverAuthSVG,
    DetailInformationSVG,
    HomeAuthSVG,
    RatingAuthSVG,
} from "../../common/svg/auth";
import { IAccountEntity } from "../../interfaces";
import {
    accountHook,
    AppDispatch,
    detailInformationHook,
    useAppDispatch,
    useAppSelector,
} from "../../utils/redux";
import { AccountSlice } from "../../utils/redux/reducers";
import { NavigationStackParamList, PropsTab } from "../../utils/types";
import { LogOutAuthSVG } from "../../common/svg/auth/log-out";
export const Account = ({ navigation, route }: PropsTab<"Account">) => {
    const dispatch = useAppDispatch<AppDispatch>();
    const navigationHook = useNavigation<NavigationProp<NavigationStackParamList>>();
    const accountSelector = useAppSelector(accountHook) as IAccountEntity;
    const detailSelector = useAppSelector(detailInformationHook);
    const [isLoading, setIsLoading] = useState(false);
    function logout() {
        dispatch(AccountSlice.actions.logout());
    }

    useFocusEffect(() => {
        setIsLoading(false);
        console.log("Effect" + JSON.stringify(accountSelector));
        if (Object.keys(accountSelector).length === 0) {
            Alert.alert(
                "Inform",
                "Please Sign In to check your profile, and you can Sign Up if not have account",
                [
                    {
                        text: "Home Page",
                        onPress: () => navigation.navigate("Home"),
                        style: "cancel",
                    },
                    { text: "Sign in", onPress: () => navigationHook.navigate("login") },
                    { text: "Sign up", onPress: () => navigationHook.navigate("register") },
                ]
            );
        } else {
            setIsLoading(true);
        }
    });

    useEffect(() => {
        if (Object.keys(accountSelector).length !== 0) {
            setIsLoading(true);
        }
    }, []);

    function randomColor() {
        return Math.floor(Math.random() * colorRan.length);
    }

    const colorRan = ["#ff8d76", "#213a58", "#09d1c7", "#f04772", "#c3c7f4", "#e3aadd"];

    return (
        <ScrollView style={{ backgroundColor: "#fff" }}>
            {isLoading && (
                <View>
                    <View style={styles.container}>
                        <View
                            style={[
                                styles.containerAvatar,
                                {
                                    paddingVertical: 24,
                                },
                            ]}
                        >
                            <View style={styles.container_nameAndAvatar}>
                                <View style={styles.borderAvatar}>
                                    {detailSelector.avatar_url ? (
                                        <Image
                                            style={styles.avatar}
                                            source={{ uri: detailSelector.avatar_url }}
                                        />
                                    ) : (
                                        <Image
                                            style={styles.avatar}
                                            source={require("../../../assets/auth/default-avatar.png")}
                                        />
                                    )}
                                </View>
                                <Text style={styles.bigName}>
                                    {detailSelector?.full_name
                                        ? detailSelector.full_name
                                        : accountSelector.username}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.view_functionList}>
                            <View style={styles.container_view_order_and_rating}>
                                <TouchableOpacity
                                    style={styles.containerSmallFunction}
                                    onPress={() => navigationHook.navigate("orders")}
                                >
                                    <Text style={styles.txt_function}>Order</Text>
                                    <DeliverAuthSVG width={24} height={24} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.containerSmallFunction}
                                    onPress={() => navigationHook.navigate("MyComment")}
                                >
                                    <Text style={styles.txt_function}>Rating</Text>
                                    <RatingAuthSVG width={24} height={24} />
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity
                                style={styles.btn_function}
                                onPress={() => navigationHook.navigate("detailInformation")}
                            >
                                <Text style={styles.txt_function}>Detail Information</Text>
                                <DetailInformationSVG width={24} height={24} />
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.btn_function}
                                onPress={() => navigation.navigate("Home")}
                            >
                                <Text style={styles.txt_function}>Go Back Home</Text>
                                <HomeAuthSVG width={24} height={24} />
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.btn_function}
                                onPress={() => {
                                    setIsLoading(false);
                                    logout();
                                }}
                            >
                                <Text style={styles.txt_function}>Logout</Text>
                                <LogOutAuthSVG width={24} height={24} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: "#fff",
        height: "100%",
    },
    containerAvatar: {
        width: "100%",
        height: 140,
    },
    avatar: {
        width: 140,
        height: 140,
        borderRadius: 100,
        margin: "auto",
    },
    borderAvatar: {
        width: 147,
        height: 147,
        borderRadius: 200,
        backgroundColor: "#fff",
        margin: "auto",
        alignItems: "center",
        justifyContent: "center",
    },
    container_nameAndAvatar: {
        position: "relative",
        top: 40,
        height: 200,
    },
    bigName: {
        textAlign: "center",
        fontSize: 28,
        fontWeight: "400",
    },

    view_functionList: {
        marginTop: 200,
    },

    btn_function: {
        backgroundColor: "#000",
        width: "80%",
        margin: "auto",
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 12,
        marginVertical: 8,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    txt_function: {
        fontSize: 20,
        color: "#fff",
        fontWeight: "500",
    },

    container_view_order_and_rating: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "80%",
        margin: "auto",
    },

    containerSmallFunction: {
        backgroundColor: "#000",
        width: "46%",
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 12,
        marginVertical: 8,
        flexDirection: "row",
        justifyContent: "space-between",
    },
});
