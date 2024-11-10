import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DetailInformationComponent, Login, Register } from "../../component/auth";
import { Category } from "../../component/category";
import { HeaderLeft, HeaderRight } from "../../component/header";
import { ShoppingCart } from "../../component/shopping-cart/shopping-cart.component";
import { NavigationStackParamList, PropsNavigate } from "../types/Navigation.type";
import { RootTab } from "./RootTab.stack";
import { FunctionAuth } from "../../component/header/functionAuth.component";
import { ProductDetails } from "../../component/productDetails";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { TabStackParamList } from "../types";

const Stack = createNativeStackNavigator<NavigationStackParamList>();
export const RootNavigation = () => {
    const navigation = useNavigation<NavigationProp<NavigationStackParamList>>();
    return (
        <Stack.Navigator initialRouteName="homepage">
            {/* Login */}
            <Stack.Screen
                name="login"
                component={Login}
                options={{
                    headerTitleAlign: "center",
                    headerLeft: () => {
                        return (
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate("homepage", {
                                        screen: "Home",
                                    })
                                }
                            >
                                <Image
                                    source={require("../../../assets/auth/goback.png")}
                                    style={{ width: 24, height: 24, paddingRight: 10 }}
                                />
                            </TouchableOpacity>
                        );
                    },
                }}
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
                options={{
                    title: "Checkout",
                    headerTitleAlign: "center",
                }}
            ></Stack.Screen>
            {/* Detail information */}
            <Stack.Screen
                name="detailInformation"
                component={DetailInformationComponent}
                options={{ title: "Detail" }}
            ></Stack.Screen>
            {/* FunctionAuth */}
            <Stack.Screen
                name="functionAuth"
                component={FunctionAuth}
                options={{ title: "Function" }}
            ></Stack.Screen>
            <Stack.Screen
                name="productDetails"
                component={ProductDetails}
                options={{ title: "ProductDetails" }}
            ></Stack.Screen>
        </Stack.Navigator>
    );
};

// export const navigationHook = useNavigation<NavigationProp<NavigationStackParamList>>();
