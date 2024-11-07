import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login, Register } from "../../component/auth";
import { NavigationStackParamList, PropsNavigate } from "../types/Navigation.type";
import { RootTab } from "./RootTab.stack";
import { Category } from "../../component/category";
import { HeaderLeft } from "../../component/header/headerLeft.component";
import { HeaderBackButtonProps } from "@react-navigation/native-stack/lib/typescript/src/types";
import { HeaderRight } from "../../component/header";
import { ShoppingCart } from "../../component/shopping-cart/shopping-cart.component";

const Stack = createNativeStackNavigator<NavigationStackParamList>();
export const RootNavigation = () => {
    return (
        <Stack.Navigator initialRouteName="homepage">
            {/* Login */}
            <Stack.Screen
                name="login"
                component={Login}
                options={{ title: "Login" }}
            ></Stack.Screen>
            {/* Register */}
            <Stack.Screen
                name="register"
                component={Register}
                options={{ title: "Register" }}
            ></Stack.Screen>
            {/* Homepage */}
            <Stack.Screen
                name="homepage"
                component={RootTab}
                options={({ navigation, route }: PropsNavigate<"homepage">) => ({
                    title: "",
                    headerLeft: () => <HeaderLeft navigation={navigation} route={route} />,
                    headerRight: () => <HeaderRight navigation={navigation} route={route} />,
                })}
            ></Stack.Screen>
            {/* Category */}
            <Stack.Screen
                name="category"
                component={Category}
                options={{ title: "Category" }}
            ></Stack.Screen>
            {/* Shopping cart */}
            <Stack.Screen
                name="shoppingCart"
                component={ShoppingCart}
                options={{ title: "Shopping" }}
            ></Stack.Screen>
        </Stack.Navigator>
    );
};
