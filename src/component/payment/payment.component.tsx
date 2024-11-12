import { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { RadioButton } from "react-native-paper";
const momoImg = require("../../../assets/components/payment/momo.png");
export const PaymentComponent = () => {
    const [checked, setChecked] = useState(true);
    return (
        <View style={styles.container}>
            <View style={styles.container_total}>
                <Text>Total</Text>
                <Text>123$</Text>
            </View>
            <View style={styles.container_listmethod}>
                <View style={styles.container_method}>
                    <Image style={styles.method_image} source={momoImg} />
                    <Text style={styles.method_name}>Momo</Text>
                    <RadioButton
                        value="first"
                        status={checked === true ? "checked" : "unchecked"}
                        onPress={() => setChecked(!checked)}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {},
    container_total: {},
    container_listmethod: {
        backgroundColor: "#ccc",
        width: "80%",
    },
    container_method: {
        flexDirection: "row",
        padding: 10,
    },
    method_image: {
        width: 50,
        height: 50,
    },
    method_name: {},
});
