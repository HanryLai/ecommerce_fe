import { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { PropsNavigate } from "../../utils/types";
import { Product } from "../../interfaces/shopping-cart.interface";
import { ScrollView } from "react-native-virtualized-view";
import { EditShoppingCartSVG } from "../../common/svg";
import api from "../../utils/axios/apiCuaHiu";

export const ShoppingCart = ({ navigation, route }: PropsNavigate<"shoppingCart">) => {
    // const id = route.params.id;
    const [productList, setProductList] = useState<Product[]>([]);
    useEffect(() => {
        api.get("/shopping-cart/")
            .then((res) => {
                return res.data;
            })
            .then((data) => {
                console.log(data);
                setProductList(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    return (
        <View style={styles.container}>
            <ScrollView style={{ height: "50%" }}>
                <FlatList
                    data={productList}
                    style={styles.container_cart}
                    renderItem={({ item }) => {
                        return (
                            <View style={styles.container_item}>
                                <Image style={styles.img_item} source={{ uri: item.images_url }} />
                                <View style={styles.container_info}>
                                    <Text style={styles.title}>{item.name}</Text>
                                    <Text style={styles.description}>{item.description}</Text>
                                    <Text style={styles.price}>{item.price}</Text>
                                </View>
                                <View style={styles.container_right}>
                                    <EditShoppingCartSVG width={32} height={32} color={"red"} />
                                    <Text style={styles.quantity}>X {item.quantity}</Text>
                                </View>
                            </View>
                        );
                    }}
                />
            </ScrollView>

            <View>
                <TouchableOpacity style={styles.btn_payment}>
                    <Text style={styles.txt_payment}>Payment</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
    },
    container_cart: {
        width: "100%",
    },
    container_info: {
        width: "60%",
    },
    container_item: {
        flexDirection: "row",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    img_item: {
        width: 100,
        height: 100,
        marginRight: 10,
        marginTop: 4,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    description: {
        fontSize: 13,
    },
    price: {},
    option_name: {},
    container_right: {
        margin: "auto",
    },
    quantity: {
        marginTop: 12,
        textAlign: "center",
        fontSize: 20,
    },
    btn_payment: {
        backgroundColor: "#4296FF",
        padding: 10,
        borderRadius: 5,
        margin: 10,
    },
    txt_payment: {
        color: "#fff",
        textAlign: "center",
        fontSize: 20,
    },
});
