import { useEffect, useRef, useState } from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Checkbox } from "react-native-paper";
import { ICartItem } from "../../interfaces/cart-item.interface";
import { IOption } from "../../interfaces/option.interface";
import { Color } from "../../style";
import api from "../../utils/axios/api-be";
import { accountHook, useAppSelector } from "../../utils/redux";
import { PropsNavigate } from "../../utils/types";

export const ShoppingCart = ({ navigation, route }: PropsNavigate<"shoppingCart">) => {
    const account = useAppSelector(accountHook);
    const [productList, setProductList] = useState<ICartItem[]>([]);
    const [listChecked, setListChecked] = useState<boolean[]>([]);
    const [chooseList, setChooseList] = useState<boolean[]>([]);
    const [total, setTotal] = useState<number>(0);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const priceAdjust = (options: IOption[]) => {
        console.log(
            "listOption",
            options.map((item) => item.listOption)
        );
        const itemPrice = options.reduce((acc, item) => acc + item.listOption.adjustPrice, 0);
        console.log("itemPrice", itemPrice);
        return itemPrice;
    };

    const priceItem = (product: ICartItem) => {
        console.log("product", product);
        return product.item.price - priceAdjust(product.options);
    };

    const totalPrice = () =>
        setTotal(
            productList.reduce((sum, item, index) => {
                if (chooseList[index]) {
                    sum += priceItem(item) * item.quantity;
                }
                return sum;
            }, 0)
        );

    function updateQuantity(quantity: number, productId: string) {
        console.log("quantity", quantity);
        console.log("productId", productId);
        api.patch(
            "/carts/update-product/" + productId,
            {
                quantity: quantity,
            },
            {
                headers: {
                    Authorization: `Bearer ${account.accessToken}`,
                },
            }
        )
            .then((res) => {
                return res.data;
            })
            .then((data) => {
                console.log(data);
            })
            .catch((err) => console.error(JSON.stringify(err)));
    }

    const adjustQuantity = (index: number, quantity: number, productId: string) => {
        const updatedList = [...productList];
        updatedList[index].quantity = updatedList[index].quantity + quantity;
        if (updatedList[index].quantity >= 0) {
            if (timeoutRef.current) clearInterval(timeoutRef.current);
            timeoutRef.current = setTimeout(() => {
                updateQuantity(updatedList[index].quantity, productId);
            }, 2000);
            setProductList(updatedList);
            totalPrice();
        }
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

    const deleteCartItem = (id: string) => {
        api.delete(`/carts/remove-product/${id}`, {
            headers: {
                Authorization: `Bearer ${account.accessToken}`,
            },
        })
            .then((res) => {
                if (res.status < 300) {
                    setProductList(productList.filter((item) => item.id !== id));
                    setListChecked(
                        listChecked.filter(
                            (_, index) => index !== productList.findIndex((item) => item.id === id)
                        )
                    );
                    setChooseList(
                        chooseList.filter(
                            (_, index) => index !== productList.findIndex((item) => item.id === id)
                        )
                    );
                }
            })
            .catch((err) => console.error(JSON.stringify(err)));
    };

    useEffect(() => {
        api.get("/carts", {
            headers: {
                Authorization: `Bearer ${account.accessToken}`,
            },
        })
            .then((res) => {
                const data = res.data.data;
                console.log(data.cartItems);
                setListChecked(new Array(data.cartItems.length).fill(false));
                setChooseList(new Array(data.cartItems.length).fill(false));
                setProductList(data.cartItems);
            })
            .catch((err) => console.error(JSON.stringify(err)));
    }, []);

    useEffect(() => {
        totalPrice();
    }, [productList]);

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
                        <Image style={styles.itemImage} source={{ uri: item.item.image_url }} />
                        <View style={styles.itemDetails}>
                            <Text style={styles.itemName}>{item.item.name}</Text>
                            <FlatList
                                data={item.options}
                                renderItem={({ item, index }) => {
                                    return (
                                        <>
                                            {index == 0 ? (
                                                <Text style={styles.optionValue}>
                                                    {item.listOption.name}
                                                </Text>
                                            ) : (
                                                <Text style={styles.optionValue}>
                                                    <></> x {item.listOption.name}
                                                </Text>
                                            )}
                                        </>
                                    );
                                }}
                                style={{ flexDirection: "row" }}
                            />
                            <Text style={styles.itemPrice}>${priceItem(item)}</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.deleteBtn}
                            onPress={() => {
                                deleteCartItem(item.id);
                            }}
                        >
                            <Text style={styles.deleteTxt}>x</Text>
                        </TouchableOpacity>
                        <View style={styles.itemActions}>
                            <TouchableOpacity
                                style={styles.quantityButton}
                                onPress={() => adjustQuantity(index, -1, item.id)}
                            >
                                <Text style={styles.buttonText}>-</Text>
                            </TouchableOpacity>
                            <Text style={styles.quantityText}>{item.quantity}</Text>
                            <TouchableOpacity
                                style={styles.quantityButton}
                                onPress={() => adjustQuantity(index, 1, item.id)}
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
        color: "#000",
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
        marginHorizontal: 10,
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
