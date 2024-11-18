import { useState } from "react";
import { Image, StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native";
import { RadioButton } from "react-native-paper";
const momoImg = require("../../../assets/components/payment/momo.png");
const codImg = require("../../../assets/components/payment/cod.png");
export const PaymentComponent = () => {
    const [checked, setChecked] = useState(0);
    function checkMethod(index: number) {
        console.log("checked");
    }
    return (
        <View style={styles.container}>
            <View style={styles.container_total}>
                <Text style={styles.txt_total}>Total</Text>
                <Text style={styles.txt_price}>$ 123</Text>
            </View>
            <View style={styles.container_listmethod}>
                <View style={styles.container_method}>
                    <Image style={styles.method_image} source={momoImg} />
                    <Text style={styles.method_name}>Momo</Text>
                    <RadioButton
                        value="1"
                        status={checked === 1 ? "checked" : "unchecked"}
                        onPress={() => setChecked(1)}
                    />
                </View>
                <View style={styles.container_method}>
                    <Image style={styles.method_image} source={codImg} />
                    <Text style={styles.method_name}>Thanh toán khi giao hàng</Text>
                    <RadioButton
                        value="first"
                        status={checked === 2 ? "checked" : "unchecked"}
                        onPress={() => setChecked(2)}
                    />
                </View>
            </View>

            <TouchableOpacity style={styles.pay_btn} onPress={() => checkMethod(checked)}>
                <Text style={styles.pay_txt}>Thanh toán</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {},
    container_total: {},
    container_listmethod: {
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
        marginTop: 32,
        fontSize: 24,
        textAlign: "center",
    },
    txt_price: {
        marginVertical: 12,
        fontSize: 32,
        textAlign: "center",
    },
    pay_btn: {
        backgroundColor: "#000",
        width: "80%",
        margin: "auto",
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 12,
        marginVertical: 8,
        flexDirection: "row",
        justifyContent: "center",
    },
    pay_txt: {
        color: "#fff",
        fontSize: 24,
    },
});
