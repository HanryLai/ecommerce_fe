import { NavigationProp, useFocusEffect, useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { IAccountEntity } from "../../interfaces";
import { accountHook, AppDispatch, useAppDispatch, useAppSelector } from "../../utils/redux";
import { AccountSlice } from "../../utils/redux/reducers";
import { NavigationStackParamList, PropsTab, TabStackParamList } from "../../utils/types";
import { Color } from "../../style";
import { EditShoppingCartSVG } from "../../common/svg";
export const Account = ({ navigation, route }: PropsTab<"Account">) => {
    const dispatch = useAppDispatch<AppDispatch>();
    const navigationHook = useNavigation<NavigationProp<NavigationStackParamList>>();
    const accountSelector = useAppSelector(accountHook) as IAccountEntity;
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
        <>
            {isLoading && (
                <View>
                    <View style={styles.container}>
                        <View
                            style={[
                                styles.containerAvatar,
                                {
                                    backgroundColor: "#fe8c77",
                                    paddingVertical: 24,
                                },
                            ]}
                        >
                            <View style={styles.container_nameAndAvatar}>
                                <View style={styles.borderAvatar}>
                                    <Image
                                        style={styles.avatar}
                                        source={{ uri: accountSelector.url_avatar }}
                                    />
                                </View>
                                <Text style={styles.bigName}>{accountSelector.username}</Text>
                            </View>
                        </View>
                        <View style={[styles.infors]}>
                            <View style={styles.input_container}>
                                <Text style={styles.txt_email}>email</Text>
                                <View style={styles.container_txt_input}>
                                    <TextInput style={styles.input} value={accountSelector.email} />
                                </View>
                            </View>
                            <View style={styles.input_container}>
                                <Text style={styles.txt_username}>username</Text>
                                <View style={styles.container_txt_input}>
                                    <TextInput
                                        style={styles.input}
                                        value={accountSelector.username}
                                    />
                                </View>
                            </View>

                            <View
                                style={[
                                    styles.input_container,
                                    {
                                        justifyContent: "space-between",
                                    },
                                ]}
                            >
                                <Text style={styles.txt_password}>password</Text>
                                <View
                                    style={[
                                        styles.container_txt_input,
                                        {
                                            justifyContent: "space-between",
                                        },
                                    ]}
                                >
                                    <TextInput
                                        style={styles.input}
                                        secureTextEntry={true}
                                        value={accountSelector.password}
                                    />
                                    <EditShoppingCartSVG width={24} height={24} />
                                </View>
                            </View>
                        </View>
                        <View>
                            <TouchableOpacity
                                style={styles.btn_function}
                                onPress={() => navigation.navigate("Home")}
                            >
                                <Text style={styles.txt_function}>Go Back Home</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.btn_function}
                                onPress={() => {
                                    setIsLoading(false);
                                    logout();
                                }}
                            >
                                <Text style={styles.txt_function}>Logout</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
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
    infors: {
        marginTop: 200,
        width: "80%",
        marginHorizontal: 44,
        marginVertical: 24,
        borderWidth: 1,
        margin: "auto",
        backgroundColor: "#fff",
        borderRadius: 24,
        paddingVertical: 32,
        paddingHorizontal: 8,
    },
    txt_username: { fontSize: 16, opacity: 0.7 },
    txt_email: { fontSize: 16, opacity: 0.7 },
    txt_password: { fontSize: 16, opacity: 0.7 },
    input_container: {
        paddingHorizontal: 8,
    },
    container_txt_input: {
        flexDirection: "row",
        borderWidth: 1,
        paddingHorizontal: 4,
        marginVertical: 4,
        borderColor: "#ccc",
        borderRadius: 8,
    },
    input: {},
    btn_function: {
        backgroundColor: "#fff",
        width: "70%",
        margin: "auto",
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 12,
        marginVertical: 8,
    },
    txt_function: {
        fontSize: 20,
        textAlign: "center",
    },
});
