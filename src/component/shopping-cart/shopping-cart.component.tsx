import { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Checkbox } from "react-native-paper";
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

    const priceAdjust = (options: Option[]) =>
        options.reduce((acc, item) => acc + parseInt(item.optionsList.adjust), 0);

    const priceItem = (product: Product) => parseInt(product.price) - priceAdjust(product.option);

    const totalPrice = () =>
        setTotal(
            productList.reduce((sum, item, index) => {
                if (chooseList[index]) {
                    sum += priceItem(item) * parseInt(item.quantity as unknown as string);
                }
                return sum;
            }, 0)
        );

    const adjustQuantity = (index: number, quantity: number) => {
        const updatedList = [...productList];
        updatedList[index].quantity =
            parseInt(updatedList[index].quantity as unknown as string) + quantity;

        setProductList(updatedList);
        totalPrice();
    };

    const toggleCheckbox = (index: number) => {
        const updatedChecked = listChecked;
        const updatedChooseList = chooseList;
        updatedChecked[index] = !updatedChecked[index];
        updatedChooseList[index] = !updatedChooseList[index];
        setListChecked(updatedChecked);
        setChooseList(updatedChooseList);
        totalPrice();
    };

    const handlePayment = () => {
        if (!chooseList.includes(true)) {
            alert("Please choose product to payment");
            return;
        }
        const productOrder = productList.filter((_, index) => chooseList[index]);
        navigation.navigate("PaymentComponent", {
            productOrder,
            total,
        });
    };

    useEffect(() => {
        api.get("/shopping-cart/")
            .then((res) => {
                const data = res.data;
                setListChecked(new Array(data.length).fill(false));
                setChooseList(new Array(data.length).fill(false));

                setProductList(data);
            })
            .catch((err) => console.error(err));
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                data={productList}
                style={styles.cartList}
                renderItem={({ item, index }) => (
                    <View style={styles.cartItem}>
                        <Checkbox
                            status={listChecked[index] ? "checked" : "unchecked"}
                            onPress={() => toggleCheckbox(index)}
                        />
                        <Image style={styles.itemImage} source={{ uri: item.images_url }} />
                        <View style={styles.itemDetails}>
                            <Text style={styles.itemName}>{item.name}</Text>
                            <FlatList
                                data={item.option}
                                renderItem={({ item }) => (
                                    <View style={styles.optionRow}>
                                        <Text style={styles.optionLabel}>{item.name}:</Text>
                                        <Text style={styles.optionValue}>
                                            {item.optionsList.name}
                                        </Text>
                                    </View>
                                )}
                            />
                            <Text style={styles.itemPrice}>${priceItem(item)}</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.deleteBtn}
                            onPress={() => {
                                console.log("delete");
                            }}
                        >
                            <Text style={styles.deleteTxt}>x</Text>
                        </TouchableOpacity>
                        <View style={styles.itemActions}>
                            <TouchableOpacity
                                style={styles.quantityButton}
                                onPress={() => adjustQuantity(index, -1)}
                            >
                                <Text style={styles.buttonText}>-</Text>
                            </TouchableOpacity>
                            <Text style={styles.quantityText}>{item.quantity}</Text>
                            <TouchableOpacity
                                style={styles.quantityButton}
                                onPress={() => adjustQuantity(index, 1)}
                            >
                                <Text style={styles.buttonText}>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
            <View style={styles.footer}>
                <View style={styles.totalRow}>
                    <Text style={styles.totalLabel}>Total:</Text>
                    <Text style={styles.totalValue}>${total}</Text>
                </View>
                <TouchableOpacity
                    style={[
                        styles.paymentButton,
                        { backgroundColor: chooseList.includes(true) ? Color.primary : "#ccc" },
                    ]}
                    onPress={handlePayment}
                >
                    <Text style={styles.paymentText}>Proceed to Payment</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    cartList: {
        marginBottom: 100,
    },
    cartItem: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        marginVertical: 5,
        backgroundColor: "#fff",
        borderRadius: 8,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    itemImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginRight: 10,
    },
    itemDetails: {
        flex: 1,
    },
    itemName: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
    },
    optionRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    optionLabel: {
        fontWeight: "bold",
        marginRight: 5,
    },
    optionValue: {
        fontStyle: "italic",
    },
    itemPrice: {
        fontSize: 16,
        fontWeight: "bold",
        color: Color.primary,
        marginTop: 10,
    },
    deleteBtn: {
        position: "absolute",
        top: 0,
        right: 10,
        paddingHorizontal: 12,
    },
    deleteTxt: {
        fontSize: 28,
        color: "#073a4d",
        fontWeight: "bold",
    },
    itemActions: {
        marginTop: 20,
        alignItems: "center",
        flexDirection: "row",
    },
    quantityButton: {
        width: 30,
        height: 30,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ddd",
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 18,
    },
    quantityText: {
        fontSize: 16,
        marginVertical: 5,
    },
    footer: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        padding: 15,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    totalRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: "bold",
    },
    totalValue: {
        fontSize: 18,
        fontWeight: "bold",
        color: Color.primary,
    },
    paymentButton: {
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
    },
    paymentText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});
