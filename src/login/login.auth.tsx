import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { LoginProps } from "../common/interface/navigation/navigation.interface";
import axios from "axios";

// import { URL_API } from "@env";

export const Login = ({ navigation }: LoginProps) => {
    // console.log("process.env.URL_API", process.env.URL_API);
    async function onPresLogin() {
        console.log("adfasf");
        const username = "ldmhieu205dfd";
        const password = "123f";
        const res = await axios.get("http://localhost:3030/api/auth", {});
        console.log(res);
        // ({
        //     method: "post",
        //     url: "http://localhost:3030/api/auth/login",
        // })
        // .then((response) => {
        //     console.log(response.data);
        // })
        // .catch((errr) => console.log(errr));
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
                    Login here
                </Text>
                <Text
                    style={{
                        width: "50%",
                        textAlign: "center",
                        marginTop: 12,
                        marginBottom: 64,
                        fontSize: 20,
                        fontWeight: 600,
                    }}
                >
                    Welcome back you've been missed
                </Text>
            </View>
            <View>
                <TextInput placeholder="Email" style={[styles.textInput]}></TextInput>
                <TextInput
                    placeholder="Password"
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
                    onPress={() => onPresLogin()}
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
            <TouchableOpacity onPress={() => navigation.navigate("register", { name: "register" })}>
                <Text style={{ textAlign: "center", fontWeight: 600 }}>Create new account</Text>
            </TouchableOpacity>

            <View
                style={{
                    marginVertical: 200,
                }}
            >
                <Text style={{ textAlign: "center" }}>Or continue with</Text>
                <View
                    style={{
                        marginTop: 32,
                        flexDirection: "row",
                        width: "48%",
                        justifyContent: "space-around",
                        alignSelf: "center",
                    }}
                >
                    <TouchableOpacity style={styles.container_LoginMethod}>
                        <AntDesign name="google" size={24} color="black" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.container_LoginMethod}>
                        <FontAwesome5 name="facebook" size={24} color="black" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.container_LoginMethod}>
                        <FontAwesome name="apple" size={24} color="black" />
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
        marginVertical: 4,

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
