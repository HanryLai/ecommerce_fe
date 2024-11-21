import { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Checkbox } from "react-native-paper";
import { ScrollView } from "react-native-virtualized-view";
import { Option } from "../../interfaces/option.interface";
import { Product } from "../../interfaces/product.interface";
import api from "../../utils/axios/apiCuaHiu";
import { PropsNavigate } from "../../utils/types";
import { Color } from "../../style";

export const ShoppingCart = ({ navigation, route }: PropsNavigate<"shoppingCart">) => {
    const [productList, setProductList] = useState<Product[]>([]);
    const [listChecked, setListChecked] = useState<boolean[]>([]);
    const [chooseList, setChooseList] = useState<boolean[]>([]);
    const [total, setTotal] = useState<number>(0);
    function priceAdjust(option: Option[]) {
        let price = 0;
        option.forEach((item) => {
            price += parseInt(item.optionsList.adjust);
        });
        return price;
    }

    function disableBtnPay() {
        if (chooseList.includes(true)) {
            return Color.primary;
        }
        return "#ccc";
    }

    function priceItem(product: Product) {
        return parseInt(product.price) - priceAdjust(product.option);
    }
    function totalPrice() {
        let total = 0;
        productList.forEach((item, index) => {
            if (chooseList[index]) {
                total += priceItem(item) * parseInt(item.quantity as unknown as string);
            }
        });
        return total;
    }

    function deleteItem(index: number) {
        console.log(index);
    }

    function adjustQuantity(index: number, quantity: number) {
        let list = productList;
        const quantityItem = parseInt(list[index].quantity as unknown as string);
        list[index].quantity = quantityItem + quantity;
        setProductList([...list]);
        setTotal(totalPrice());
    }

    function checkChoose(index: number) {
        let list = listChecked;
        let choose = chooseList;
        list[index] = !list[index];
        choose[index] = !chooseList[index];
        setListChecked([...list]);
        setChooseList([...chooseList]);
        setTotal(totalPrice());
    }

    function paymentNavigation() {
        if (!chooseList.includes(true)) {
            alert("Please choose product to payment");
            return;
        }
        const productOrder = productList.filter((item, index) => {
            if (chooseList[index]) {
                return item;
            }
        });
        navigation.navigate("PaymentComponent", {
            productOrder: productOrder,
            total: total,
        });
    }
    useEffect(() => {
        api.get("/shopping-cart/")
            .then((res) => {
                return res.data;
            })
            .then((data) => {
                setListChecked(new Array(data.length).fill(false));
                setChooseList(new Array(data.length).fill(false));
                setProductList(data);
                setTotal(totalPrice());
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    return (
        <ScrollView style={styles.container}>
            <ScrollView style={[styles.container]}>
                <FlatList
                    data={productList}
                    style={styles.container_cart}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={styles.container_item}>
                                <Checkbox
                                    status={listChecked[index] ? "checked" : "unchecked"}
                                    onPress={() => {
                                        checkChoose(index);
                                    }}
                                />
                                <Image style={styles.img_item} source={{ uri: item.images_url }} />
                                <View style={styles.container_info}>
                                    <Text style={styles.title}>{item.name}</Text>
                                    <FlatList
                                        data={item.option}
                                        renderItem={({ item }) => {
                                            return (
                                                <View style={styles.container_option}>
                                                    <Text style={styles.option_name}>
                                                        {item.name}:
                                                    </Text>
                                                    <Text style={styles.optionList_name}>
                                                        {item.optionsList.name}
                                                    </Text>
                                                </View>
                                            );
                                        }}
                                        style={styles.flatList}
                                    />
                                    <View style={styles.container_priceItem}>
                                        <Text style={styles.txt_priceItem}>Price:</Text>
                                        <Text style={styles.price}>{priceItem(item)}$</Text>
                                    </View>
                                </View>
                                <View style={styles.container_right}>
                                    <Text
                                        style={styles.delete_item}
                                        onPress={() => deleteItem(index)}
                                    >
                                        X
                                    </Text>
                                    <View style={styles.container_quantity}>
                                        <TouchableOpacity
                                            onPress={() => adjustQuantity(index, -1)}
                                            style={styles.btn_adjustQuantity}
                                        >
                                            <Text style={styles.signQuantity}>-</Text>
                                        </TouchableOpacity>
                                        <Text style={styles.quantity}>{item.quantity}</Text>
                                        <TouchableOpacity
                                            onPress={() => adjustQuantity(index, 1)}
                                            style={styles.btn_adjustQuantity}
                                        >
                                            <Text style={styles.signQuantity}>+</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        );
                    }}
                />
            </ScrollView>
            <View>
                <View style={styles.container_total}>
                    <Text style={styles.txt_total}>Total:</Text>
                    <Text style={styles.txt_price}>$ {total}</Text>
                </View>

                <View>
                    <TouchableOpacity
                        style={[
                            styles.btn_payment,
                            {
                                backgroundColor: disableBtnPay(),
                            },
                        ]}
                        onPress={() => paymentNavigation()}
                    >
                        <Text style={styles.txt_payment}>Payment</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
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
        borderRadius: 4,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    description: {
        fontSize: 13,
    },
    price: {
        fontSize: 16,
        fontWeight: "bold",
    },
    container_option: {
        flexDirection: "row",
    },
    option_name: {
        fontWeight: "bold",
    },
    optionList_name: {},
    flatList: {
        height: 55, // Set a fixed height for the FlatList
    },
    container_priceItem: {
        flexDirection: "row",
        gap: 12,
        position: "absolute",
        bottom: 0,
    },
    container_right: {
        margin: "auto",
    },
    quantity: {
        marginTop: 12,
        textAlign: "center",
        fontSize: 20,
    },

    txt_priceItem: {
        fontWeight: "bold",
        fontSize: 16,
    },

    container_total: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 62,
    },
    container_listmethod: {
        flexDirection: "column",
        // backgroundColor: "#ccc",
        width: "80%",
        margin: "auto",
        gap: 12,
    },
    container_method: {
        flexDirection: "row",
        padding: 10,
        justifyContent: "space-between",
        backgroundColor: "#fff",
        borderRadius: 12,
        borderWidth: 1,
    },
    method_image: {
        width: 50,
        height: 50,
        borderRadius: 12,
    },
    method_name: {
        width: 200,
    },
    txt_total: {
        fontSize: 24,
        textAlign: "center",
    },
    txt_price: {
        fontSize: 32,
        textAlign: "center",
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
    delete_item: {
        position: "relative",
        left: 70,
        top: -10,
        color: "red",
        fontSize: 24,
        fontWeight: "bold",
    },

    container_quantity: {
        flexDirection: "row",
        paddingRight: 80,
    },
    btn_adjustQuantity: {
        backgroundColor: "#ccc",
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 12,
        margin: 4,
    },
    signQuantity: {
        fontSize: 20,
        fontWeight: "bold",
    },
});
