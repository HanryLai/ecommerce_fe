import AntDesign from "@expo/vector-icons/AntDesign";
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    FlatList,
    ListRenderItem,
    ActivityIndicator,
    Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { AppDispatch, RootState, useAppSelector } from "../../utils/redux";
import { CategoryType } from "../../utils/types/type/category.type";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-virtualized-view";
import axios from "axios";
import api from "../../utils/axios";
import productSlice from "../../utils/redux/reducers/product.redux";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { NavigationStackParamList } from "../../utils/types";
import ProductComponent from "../products/productComponent";
import { ProductType } from "../../utils/types/type/product.type";
import { Order } from "../../utils/types/type/order.type";
import { grey100, pink100, white } from "react-native-paper/lib/typescript/styles/themes/v2/colors";
import orderSlice from "../../utils/redux/reducers/order.redux";

export function Orders() {
    const navigationHook = useNavigation<NavigationProp<NavigationStackParamList>>();
    const dispatch = useDispatch<AppDispatch>();

    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        api.get(`/orders`)
            .then((response) => response.data.data)
            .then((data) => {
                setOrders(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const handleOrder = (order: Order) => {
        dispatch(orderSlice.actions.selectorder(order));
        navigationHook.navigate("feedback", { order: order });
    };
    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >
                <View style={{ flex: 1, width: "100%" }}>
                    <FlatList
                        data={orders}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={{
                                    backgroundColor: "white",
                                    borderWidth: 0.5,
                                    borderColor: "gray",
                                    padding: 15,
                                    width: "100%",
                                    gap: 20,
                                    marginVertical: 5,
                                }}
                            >
                                <View
                                    style={{
                                        flex: 1,
                                        flexDirection: "row",

                                        width: "100%",
                                    }}
                                >
                                    <Image
                                        source={{ uri: item.orderItems.at(0)?.products.image_url }}
                                        width={80}
                                        height={80}
                                        style={{ marginLeft: 10, marginRight: 4 }}
                                    />
                                    <View style={{ width: 140 }}>
                                        <Text style={styles.TextBold}>
                                            {item.orderItems.at(0)?.products.name}
                                        </Text>
                                        <Text>{item.orderItems.length} sản phẩm</Text>
                                    </View>
                                    <TouchableOpacity
                                        style={{
                                            backgroundColor: "#00BDD6",
                                            padding: 5,
                                            width: 100,
                                            height: 30,
                                            borderRadius: 5,
                                            justifyContent: "center",
                                            alignItems: "center",
                                            alignSelf: "flex-end",
                                        }}
                                        onPress={() => {
                                            handleOrder(item);
                                        }}
                                    >
                                        <Text>Đánh giá</Text>
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item) => item.id}
                    />
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        paddingTop: 50,
        gap: 20,
    },
    search: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        borderRadius: 5,
    },
    SearchBar: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        gap: 10,
        borderRadius: 5,
    },
    TextBold: {
        fontWeight: "bold",
        fontSize: 16,
    },
    TextLight: {
        fontWeight: "300",
        fontSize: 12,
    },
    category: {
        backgroundColor: "red",
        width: 100,
        height: 100,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 2,
        borderRadius: 10,
    },
    errorText: {
        color: "red",
        textAlign: "center",
    },
    categories: {
        marginBottom: 10,
    },
    options: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 10,
    },
    option: {
        padding: 4,
        borderRadius: 10,
    },
    products: {
        width: "100%",
        marginVertical: 10,
    },
    product: {
        width: "100%",
        height: 80,
        backgroundColor: "white",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
    },
});
