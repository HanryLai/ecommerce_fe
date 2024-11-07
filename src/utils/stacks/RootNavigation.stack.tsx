import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DetailInformationComponent, Login, Register } from "../../component/auth";
import { Category } from "../../component/category";
import { HeaderLeft, HeaderRight } from "../../component/header";
import { ShoppingCart } from "../../component/shopping-cart/shopping-cart.component";
import { NavigationStackParamList, PropsNavigate } from "../types/Navigation.type";
import { RootTab } from "./RootTab.stack";

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
                    headerLeft: () => <HeaderLeft />,
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
            {/* Detail information */}
            <Stack.Screen
                name="detailInformation"
                component={DetailInformationComponent}
                options={{ title: "Detail" }}
            ></Stack.Screen>
        </Stack.Navigator>
    );
};
