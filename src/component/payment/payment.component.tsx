import React, { useState } from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RadioButton } from "react-native-paper";
import { Product } from "../../interfaces/product.interface";
import { PropsNavigate } from "../../utils/types";

const codImg = require("../../../assets/components/payment/cod.png");
const momoImg = require("../../../assets/components/payment/momo.png");

export const PaymentComponent = ({ navigation, route }: PropsNavigate<"shoppingCart">) => {
    const [productList, setProductList] = useState<Product[]>(route.params.productOrder);
    const [total, setTotal] = useState<number>(route.params.total);
    const [checked, setChecked] = useState(1); // Default selected payment method

    const renderProductItem = ({ item }: { item: Product }) => (
        <View style={styles.productItem}>
            <Image style={styles.productImage} source={{ uri: item.images_url }} />
            <View style={styles.productInfo}>
                <Text style={styles.productTitle}>{item.name}</Text>
                <FlatList
                    data={item.option}
                    renderItem={({ item }) => (
                        <View style={styles.productOption}>
                            <Text style={styles.optionName}>{item.name}:</Text>
                            <Text style={styles.optionValue}>{item.optionsList.name}</Text>
                        </View>
                    )}
                    keyExtractor={(_, index) => index.toString()}
                />
                <Text style={styles.productPrice}>Price: ${item.price}</Text>
            </View>
            <View style={styles.productQuantity}>
                <Text style={styles.quantityLabel}>SL: {item.quantity}</Text>
            </View>
        </View>
    );

    const renderPaymentMethod = (id: number, label: string, image: any) => (
        <View style={styles.paymentMethod}>
            <Image style={styles.methodImage} source={image} />
            <Text style={styles.methodLabel}>{label}</Text>
            <RadioButton
                value={id.toString()}
                status={checked === id ? "checked" : "unchecked"}
                onPress={() => setChecked(id)}
            />
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={productList}
                renderItem={renderProductItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.productList}
            />

            <View style={styles.footer}>
                <View style={styles.totalContainer}>
                    <Text style={styles.totalLabel}>Total:</Text>
                    <Text style={styles.totalPrice}>$ {total}</Text>
                </View>
                <View style={styles.paymentMethods}>
                    {renderPaymentMethod(1, "Momo", momoImg)}
                    {renderPaymentMethod(2, "Thanh toán khi giao hàng", codImg)}
                </View>
                <TouchableOpacity style={styles.paymentButton} onPress={() => {}}>
                    <Text style={styles.paymentButtonText}>Payment</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8f9fa",
        paddingHorizontal: 16,
    },
    productList: {
        paddingBottom: 250, // To ensure footer is not overlapped
    },
    productItem: {
        flexDirection: "row",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    productImage: {
        width: 100,
        height: 100,
        marginRight: 10,
        borderRadius: 4,
    },
    productInfo: {
        flex: 1,
    },
    productTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 4,
    },
    productOption: {
        flexDirection: "row",
        marginBottom: 4,
    },
    optionName: {
        fontWeight: "bold",
    },
    optionValue: {
        marginLeft: 4,
    },
    productPrice: {
        marginTop: 8,
        fontSize: 14,
        fontWeight: "bold",
        color: "#333",
    },
    productQuantity: {
        justifyContent: "center",
        alignItems: "flex-end",
    },
    quantityLabel: {
        fontSize: 14,
    },
    footer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#fff",
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: "#ccc",
    },
    totalContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 16,
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: "bold",
    },
    totalPrice: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#4296FF",
    },
    paymentMethods: {
        marginBottom: 16,
    },
    paymentMethod: {
        flexDirection: "row",
        alignItems: "center",
        padding: 8,
        backgroundColor: "#f1f1f1",
        borderRadius: 8,
        marginBottom: 8,
    },
    methodImage: {
        width: 40,
        height: 40,
        borderRadius: 8,
        marginRight: 12,
    },
    methodLabel: {
        flex: 1,
        fontSize: 16,
    },
    paymentButton: {
        backgroundColor: "#4296FF",
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
    },
    paymentButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
});
