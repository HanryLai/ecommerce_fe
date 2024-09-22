import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login } from "./src/component/login/login.auth";
import { Register } from "./src/component/login/register.auth";
import { HomePage } from "./src/component/home/homepage";

const Stack = createNativeStackNavigator();
export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="login">
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
                <Stack.Screen
                    name="homepage"
                    component={HomePage}
                    options={{ title: "Homepage" }}
                ></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
