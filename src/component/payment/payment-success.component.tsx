import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { PropsNavigate } from "../../utils/types";
import { accountHook, useAppSelector } from "../../utils/redux";

export const PaymentSuccess = ({ navigation, route }: PropsNavigate<"paymentSuccess">) => {
    const order = route.params.order;
    const method = route.params.method;
    const account = useAppSelector(accountHook);
    const renderStars = () => {
        return (
            <FlatList
                horizontal
                data={[1, 2, 3, 4, 5]}
                keyExtractor={(item) => item.toString()}
                renderItem={({ item }) => <MaterialIcons name="star" size={24} color="#fdd95f" />}
            />
        );
    };

    return (
        <View style={styles.container}>
            <MaterialIcons name="check-circle" size={80} color="#4CAF50" style={styles.icon} />
            <Text style={styles.successText}>Order placed successfully</Text>
            <Text style={styles.subtitle}>Thanks for you</Text>
            <View style={styles.card}>
                <View style={styles.row}>
                    <Text style={styles.label}>Subtotal</Text>
                    <Text style={styles.value}>{order.total_price}</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Method payment</Text>
                    <Text style={styles.value}>
                        {method == 1 ? "MoMo App" : "We offer Cash on Delivery (COD)"}
                    </Text>
                </View>
            </View>
            <Text style={styles.feedbackText}>How was your experience?</Text>
            <View style={styles.starsContainer}>{renderStars()}</View>
            <TouchableOpacity
                style={styles.button}
                onPress={() =>
                    navigation.navigate("homepage", {
                        screen: "Home",
                        id: account.id,
                        username: account.username,
                    })
                }
            >
                <Text style={styles.buttonText}>Back to home</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: "center",
        backgroundColor: "#f8f8f8",
    },
    icon: {
        marginVertical: 20,
    },
    successText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#00a6e7",
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 14,
        textAlign: "center",
        color: "#7a7a7a",
        marginBottom: 20,
    },
    card: {
        width: "100%",
        backgroundColor: "#e8e8e8",
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    totalRow: {
        marginTop: 10,
        borderTopWidth: 1,
        borderTopColor: "#ccc",
        paddingTop: 10,
    },
    label: {
        fontSize: 14,
        color: "#4b4b4b",
    },
    value: {
        fontSize: 14,
        color: "#4b4b4b",
    },
    totalLabel: {
        fontSize: 16,
        fontWeight: "bold",
    },
    totalValue: {
        fontSize: 16,
        fontWeight: "bold",
    },
    highlight: {
        color: "#4CAF50",
    },
    feedbackText: {
        fontSize: 16,
        fontWeight: "bold",
        marginVertical: 10,
    },
    starsContainer: {
        flexDirection: "row",
        marginBottom: 20,
    },
    button: {
        backgroundColor: "#00a6e7",
        padding: 15,
        borderRadius: 10,
        width: "100%",
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
});
