import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { IAccountEntity } from "../../interfaces";
import { accountHook, AppDispatch, useAppDispatch, useAppSelector } from "../../utils/redux";
import { AccountSlice } from "../../utils/redux/reducers";
import { NavigationStackParamList, PropsTab, TabStackParamList } from "../../utils/types";
export const Account = ({ navigation, route }: PropsTab<"Account">) => {
    const dispatch = useAppDispatch<AppDispatch>();
    const navigationHook = useNavigation<NavigationProp<NavigationStackParamList>>();
    const accountSelector = useAppSelector(accountHook) as IAccountEntity;

    function logout() {
        dispatch(AccountSlice.actions.logout());
    }

    useEffect(() => {
        console.log("Effect" + JSON.stringify(accountSelector));
        if (Object.keys(accountSelector).length === 0) {
            navigationHook.navigate("login");
        }
    });
    function randomColor() {
        return Math.floor(Math.random() * colorRan.length);
    }

    const colorRan = ["#ff8d76", "#213a58", "#09d1c7", "#f04772", "#c3c7f4", "#e3aadd"];

    return (
        <>
            <View>
                <View style={styles.container}>
                    <View
                        style={[
                            styles.containerAvatar,
                            {
                                backgroundColor: colorRan[randomColor()],
                                paddingVertical: 24,
                            },
                        ]}
                    >
                        <Image style={styles.avatar} source={{ uri: accountSelector.url_avatar }} />
                    </View>
                    <View style={[styles.infors]}>
                        <View style={styles.input_container}>
                            <Text style={styles.txt_username}>username</Text>
                            <View style={styles.container_txt_input}>
                                <TextInput style={styles.input} value={accountSelector.username} />
                            </View>
                        </View>
                        <View style={styles.input_container}>
                            <Text style={styles.txt_email}>email</Text>
                            <View style={styles.container_txt_input}>
                                <TextInput style={styles.input} value={accountSelector.email} />
                            </View>
                        </View>
                        <View style={styles.input_container}>
                            <Text style={styles.txt_password}>password</Text>
                            <View style={styles.container_txt_input}>
                                <TextInput
                                    style={styles.input}
                                    secureTextEntry={true}
                                    value={accountSelector.password}
                                />
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
                                logout();
                            }}
                        >
                            <Text style={styles.txt_function}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ccc",
        height: "100%",
    },
    containerAvatar: {
        width: "100%",
    },
    avatar: {
        width: 200,
        height: 200,
        borderWidth: 1,
        borderRadius: 200,
        margin: "auto",
    },
    infors: {
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
