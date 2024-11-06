import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootNavigation } from "./src/utils/stacks/RootNavigation.stack";
import { Provider } from "react-redux";
import { store } from "./src/utils/redux";

const Stack = createNativeStackNavigator();
export default function App() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="main">
                    <Stack.Screen
                        name="main"
                        component={RootNavigation}
                        options={{ headerShown: false }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}
