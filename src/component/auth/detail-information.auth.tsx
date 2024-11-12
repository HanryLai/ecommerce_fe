import {
    Alert,
    Image,
    ScrollViewBase,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { EditShoppingCartSVG } from "../../common/svg";
import { accountHook, AppDispatch, useAppDispatch, useAppSelector } from "../../utils/redux";
import { IAccountEntity } from "../../interfaces";
import { ScrollView } from "react-native-virtualized-view";
import { useState } from "react";
import api from "../../utils/axios/apiCuaHiu";

export const DetailInformationComponent = () => {
    const accountSelector = useAppSelector(accountHook) as IAccountEntity;
    const [email, setEmail] = useState(accountSelector.email);
    const [username, setUsername] = useState(accountSelector.username);
    const [url_avatar, setUrl_avatar] = useState(accountSelector.url_avatar);
    const [password, setPassword] = useState(accountSelector.password);
    const [address, setAddress] = useState(accountSelector.address);
    const [phone, setPhone] = useState(accountSelector.phone);
    const [fullname, setFullname] = useState(accountSelector.fullname);
    const [isEdit, setIsEdit] = useState(false);
    function fetchAccountOrigin() {
        setEmail(accountSelector.email);
        setUsername(accountSelector.username);
        setUrl_avatar(accountSelector.url_avatar);
        setPassword(accountSelector.password);
        setAddress(accountSelector.address);
        setPhone(accountSelector.phone);
        setFullname(accountSelector.fullname);
    }

    function updateAccount() {
        api.put("/account/" + accountSelector.id, {
            ...accountSelector,
            email,
            username,
            url_avatar,
            password,
            address,
            phone,
            fullname,
        })
            .then((res) => res.data)
            .then((data) => {
                Alert.alert("Update account successfully");
                setIsEdit(false);
                fetchAccountOrigin();
            })
            .catch((err) => console.log(err));
    }
    return (
        <View>
            <View>
                <View
                    style={[
                        styles.containerAvatar,
                        {
                            backgroundColor: "#fe8c77",
                            paddingVertical: 24,
                        },
                    ]}
                >
                    <View style={styles.container_nameAndAvatar}>
                        <View style={styles.borderAvatar}>
                            <Image
                                style={styles.avatar}
                                source={{ uri: accountSelector.url_avatar }}
                            />
                        </View>
                        <Text style={styles.bigName}>{fullname}</Text>
                    </View>
                </View>
                <View style={[styles.infors]}>
                    <View style={styles.input_container}>
                        <Text style={styles.txt_email}>Email</Text>
                        <View style={styles.container_txt_input}>
                            <TextInput
                                style={styles.input}
                                value={email}
                                onChangeText={(text) => setEmail(text)}
                                editable={isEdit}
                                focusable={isEdit}
                            />
                            <EditShoppingCartSVG width={24} height={24} />
                        </View>
                    </View>
                    <View style={styles.input_container}>
                        <Text style={styles.txt_email}>Full name</Text>
                        <View style={styles.container_txt_input}>
                            <TextInput
                                style={styles.input}
                                value={fullname}
                                onChangeText={(text) => setFullname(text)}
                                editable={isEdit}
                                focusable={isEdit}
                            />
                            <EditShoppingCartSVG width={24} height={24} />
                        </View>
                    </View>
                    <View style={styles.input_container}>
                        <Text style={styles.txt_username}>Username</Text>
                        <View style={styles.container_txt_input}>
                            <TextInput
                                style={styles.input}
                                value={username}
                                onChangeText={(text) => setUsername(text)}
                                editable={isEdit}
                                focusable={isEdit}
                            />
                            <EditShoppingCartSVG width={24} height={24} />
                        </View>
                    </View>
                    <View style={styles.input_container}>
                        <Text style={styles.txt_username}>Phone</Text>
                        <View style={styles.container_txt_input}>
                            <TextInput
                                style={styles.input}
                                value={phone}
                                onChangeText={(text) => setPhone(text)}
                                editable={isEdit}
                                focusable={isEdit}
                            />
                            <EditShoppingCartSVG width={24} height={24} />
                        </View>
                    </View>
                    <View style={styles.input_container}>
                        <Text style={styles.txt_username}>Address</Text>
                        <View style={styles.container_txt_input}>
                            <TextInput
                                style={styles.input}
                                value={address}
                                onChangeText={(text) => setAddress(text)}
                                editable={isEdit}
                                focusable={isEdit}
                            />
                            <EditShoppingCartSVG width={24} height={24} />
                        </View>
                    </View>
                    <View
                        style={[
                            styles.input_container,
                            {
                                justifyContent: "space-between",
                            },
                        ]}
                    >
                        <Text style={styles.txt_password}>Password</Text>
                        <View style={styles.container_txt_input}>
                            <TextInput
                                style={styles.input}
                                secureTextEntry={true}
                                value={password}
                                onChangeText={(text) => setPassword(text)}
                                editable={isEdit}
                                focusable={isEdit}
                            />
                            <EditShoppingCartSVG width={24} height={24} />
                        </View>
                    </View>
                </View>
            </View>

            <View>
                {isEdit ? (
                    <View style={styles.container_CancelAndConfirm}>
                        <TouchableOpacity
                            style={styles.containerSmallFunction}
                            onPress={() => {
                                fetchAccountOrigin();
                                setIsEdit(false);
                            }}
                        >
                            <Text style={styles.txt_function}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.containerSmallFunction}
                            onPress={() => {
                                updateAccount();
                            }}
                        >
                            <Text style={styles.txt_function}>Confirm</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <TouchableOpacity
                        style={styles.btn_function}
                        onPress={() => {
                            setIsEdit(true);
                        }}
                    >
                        <Text style={styles.txt_function}>Update</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    containerAvatar: {
        width: "100%",
        height: 140,
    },
    avatar: {
        width: 140,
        height: 140,
        borderRadius: 100,
        margin: "auto",
    },
    borderAvatar: {
        width: 147,
        height: 147,
        borderRadius: 200,
        backgroundColor: "#fff",
        margin: "auto",
        alignItems: "center",
        justifyContent: "center",
    },
    container_nameAndAvatar: {
        position: "relative",
        top: 40,
        height: 200,
    },
    bigName: {
        textAlign: "center",
        fontSize: 28,
        fontWeight: "400",
    },
    infors: {
        marginTop: 132,
        width: "80%",
        marginHorizontal: 44,
        marginVertical: 24,
        borderWidth: 1,
        margin: "auto",
        backgroundColor: "#fff",
        borderRadius: 24,
        paddingVertical: 32,
        paddingHorizontal: 8,
    },
    txt_username: { fontSize: 16, opacity: 0.7 },
    txt_email: { fontSize: 16, opacity: 0.7 },
    txt_password: { fontSize: 16, opacity: 0.7 },
    input_container: {
        paddingHorizontal: 8,
    },
    container_txt_input: {
        flexDirection: "row",
        borderWidth: 1,
        paddingHorizontal: 4,
        marginVertical: 4,
        borderColor: "#ccc",
        borderRadius: 8,
        justifyContent: "space-between",
    },
    input: {},
    btn_function: {
        backgroundColor: "#000",
        width: "80%",
        margin: "auto",
        paddingHorizontal: 12,
        paddingVertical: 12,
        borderRadius: 12,
        marginVertical: 8,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    txt_function: {
        fontSize: 20,
        color: "#fff",
        fontWeight: "500",
        margin: "auto",
    },

    container_CancelAndConfirm: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "80%",
        margin: "auto",
    },

    containerSmallFunction: {
        backgroundColor: "#000",
        width: "46%",
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 12,
        marginVertical: 8,
        flexDirection: "row",
        justifyContent: "space-between",
    },
});
