import axios from "axios";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { IAccountEntity } from "../../interfaces";
import { useState } from "react";
import { Props } from "../../common/types/props.type";

export const Register = ({ navigation }: Props) => {
    const [email, setEmail] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    function onPressRegister() {
        if (password === confirmPassword)
            axios
                .post("http://10.0.2.2:3030/api/auth/register", {
                    email: email.trim(),
                    username: username.trim(),
                    password: password.trim(),
                })
                .then((res) => {
                    return res.data.data;
                })
                .then((data: IAccountEntity) => {
                    Alert.alert(
                        "Register successfully",
                        `Hello  ${data.email} , you can login with this account right now ! `
                    );
                })
                .catch((error) => Alert.alert("Register failed", JSON.stringify(error)));
    }
    return (
        <View>
            <View>
                <View style={styles.bg_ellipse_in}>
                    <Text></Text>
                </View>
                <View style={styles.bg_ellipse_out}></View>
                <View></View>
                <View></View>
            </View>
            <View
                style={{
                    alignItems: "center",
                    marginTop: 80,
                }}
            >
                <Text
                    style={{
                        color: "#1F41BB",
                        fontSize: 30,
                        fontWeight: 600,
                    }}
                >
                    Create Account
                </Text>
                <Text
                    style={{
                        width: "90%",
                        textAlign: "center",
                        marginTop: 12,
                        marginBottom: 64,
                        fontSize: 20,
                        fontWeight: 600,
                    }}
                >
                    Create an account so you can explore all the existing jobs
                </Text>
            </View>
            <View>
                <TextInput
                    onChangeText={(text) => setEmail(text)}
                    placeholder="Email"
                    style={[styles.textInput]}
                ></TextInput>
                <TextInput
                    onChangeText={(text) => setUsername(text)}
                    placeholder="Username"
                    style={[styles.textInput]}
                ></TextInput>
                <TextInput
                    onChangeText={(text) => setPassword(text)}
                    placeholder="Password"
                    secureTextEntry={true}
                    style={[styles.textInput]}
                ></TextInput>
                <TextInput
                    onChangeText={(text) => setConfirmPassword(text)}
                    placeholder="Confirm password"
                    secureTextEntry={true}
                    style={[styles.textInput]}
                ></TextInput>
            </View>
            <View style={{ width: "100%" }}>
                <Text
                    style={{
                        textAlign: "right",
                        paddingHorizontal: 12,
                        paddingVertical: 24,
                        color: "#1F41BB",
                        fontWeight: 600,
                    }}
                >
                    Forgot your password?
                </Text>
                <TouchableOpacity
                    style={{
                        alignSelf: "center",
                        alignItems: "center",
                        width: "94%",
                        borderRadius: 10,
                        marginVertical: 24,
                        marginHorizontal: 12,
                        paddingVertical: 15,
                        backgroundColor: "#1F41BB",
                    }}
                    onPress={() => onPressRegister()}
                >
                    <Text
                        style={{
                            color: "#fff",
                            fontSize: 20,
                            fontWeight: 600,
                        }}
                    >
                        Sign in
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={{ alignItems: "center" }}>
                <View style={{ flexDirection: "row" }}>
                    <Text style={{ textAlign: "center", fontWeight: 600 }}>
                        Already have account ?
                    </Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("login", { name: "login" })}
                    >
                        <Text style={{ color: "#2241b9" }}>Login here</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    center_container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    textInput: {
        marginHorizontal: 12,
        marginVertical: 8,

        paddingHorizontal: 12,
        paddingVertical: 4,

        borderWidth: 1,
        borderRadius: 8,

        backgroundColor: "#f1f4ff",
    },

    container_LoginMethod: {
        width: 52,
        height: 36,
        backgroundColor: "#ececec",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
    },
    bg_ellipse_in: {
        width: 400,
        height: 400,
        borderRadius: 200,
        backgroundColor: "#f8f9ff",
        position: "absolute",
        top: -140,
        right: -140,
    },

    bg_ellipse_out: {
        width: 500,
        height: 500,
        borderRadius: 250,
        position: "absolute",
        borderColor: "#F8F9FF",
        borderWidth: 3,
        top: -140,
        right: -140,
    },
});
