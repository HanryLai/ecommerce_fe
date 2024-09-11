import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Register } from "./src/login/register.auth";
import { Login } from "./src/login/login.auth";

const Stack = createNativeStackNavigator();
export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="login"
                    component={Login}
                    options={{ title: "Login" }}
                ></Stack.Screen>
                <Stack.Screen
                    name="register"
                    component={Register}
                    options={{ title: "Register" }}
                ></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

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
});
