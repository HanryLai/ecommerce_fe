import { useEffect, useState } from "react";
import {
    Alert,
    Button,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { IAccountEntity, IDetailInformationEntity } from "../../interfaces";
import * as DocumentPicker from "expo-document-picker";
import api from "../../utils/axios/api-be";
import {
    accountHook,
    detailInformationHook,
    useAppDispatch,
    useAppSelector,
} from "../../utils/redux";
import { AccountSlice } from "../../utils/redux/reducers";
interface FileDetails {
    uri: string;
    name: string;
    size: number;
    type: string;
}

export const DetailInformationComponent = () => {
    const accountSelector = useAppSelector(accountHook) as IAccountEntity;
    const detailSelector = useAppSelector(detailInformationHook) as IDetailInformationEntity;
    const dispatch = useAppDispatch();

    const [email, setEmail] = useState(accountSelector.email);
    const [username, setUsername] = useState(accountSelector.username);

    const [url_avatar, setUrl_avatar] = useState(detailSelector.avatar_url);
    const [address, setAddress] = useState(detailSelector.address);
    const [phone, setPhone] = useState(detailSelector.phone);
    const [fullname, setFullname] = useState(detailSelector.full_name);

    const [file, setFile] = useState<FileDetails | null>(null);

    const [isEdit, setIsEdit] = useState(false);
    function fetchAccountOrigin() {
        setEmail(accountSelector.email);
        setUsername(accountSelector.username);
        setUrl_avatar(detailSelector.avatar_url);
        setAddress(detailSelector.address);
        setPhone(detailSelector.phone);
        setFullname(detailSelector.full_name);
        setFile(null);
    }

    function fetchDetailInformation() {
        api.get("/detail-information/my", {
            headers: {
                Authorization: `Bearer ${accountSelector.accessToken}`,
            },
        })
            .then((res) => {
                return res.data.data;
            })
            .then((data) => {
                dispatch(AccountSlice.actions.saveDetail(data));
                setUrl_avatar(data.avatar_url);
                setAddress(data.address);
                setPhone(data.phone);
                setFullname(data.full_name);
            })
            .catch((err) => console.log(JSON.stringify(err)));
    }

    const pickDocument = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: "image/*", // To allow only images.
                copyToCacheDirectory: true,
            });

            if (result.canceled === false) {
                setFile({
                    uri: result.assets[0].uri,
                    name: result.assets[0].name,
                    size: result.assets[0].size ?? 0, // Fallback to 0 if size is undefined.
                    type: result.assets[0].mimeType ?? "unknown", // Optional mimeType or fallback.
                });
                setIsEdit(true);
            }
        } catch (error) {
            console.error("Error picking document:", error);
        }
    };

    const uploadImage = async () => {
        let newAvatar = file?.uri;
        if (file?.uri && file?.type && file?.name) {
            const formData = new FormData();
            formData.append("file", {
                uri: file.uri,
                name: file.name,
                type: file.type,
                size: file.size,
            } as unknown as Blob);
            await api
                .post("/cloud/upload-file", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((res) => res.data.data)
                .then((data) => {
                    setUrl_avatar(data.url);
                    newAvatar = data.url;
                })
                .catch((err) => console.log(JSON.stringify(err)));
        }
        return newAvatar ?? "";
    };

    async function updateAccount() {
        let newAvatar = url_avatar;
        if (file?.uri) {
            newAvatar = await uploadImage();
        }
        api.patch(
            "/detail-information/update",
            {
                address: address,
                phone: phone,
                full_name: fullname,
                avatar_url: newAvatar,
            },
            {
                headers: {
                    Authorization: `Bearer ${accountSelector.accessToken}`,
                },
            }
        )
            .then((res) => res.data.data)
            .then((data) => {
                if (data.affected == 0) {
                    Alert.alert("Something wrong");
                } else {
                    Alert.alert("Update success");
                }
                fetchDetailInformation();
                setIsEdit(false);
            })
            .catch((err) => console.log(JSON.stringify(err)));
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
                            {detailSelector?.avatar_url ? (
                                <>
                                    {file?.uri ? (
                                        <Image style={styles.avatar} source={{ uri: file?.uri }} />
                                    ) : (
                                        <Image style={styles.avatar} source={{ uri: url_avatar }} />
                                    )}
                                </>
                            ) : (
                                <>
                                    {file?.uri ? (
                                        <Image style={styles.avatar} source={{ uri: file?.uri }} />
                                    ) : (
                                        <Image
                                            style={styles.avatar}
                                            source={require("../../../assets/auth/default-avatar.png")}
                                        />
                                    )}
                                </>
                            )}
                        </View>

                        <Text style={styles.bigName}>
                            {detailSelector?.full_name
                                ? detailSelector.full_name
                                : accountSelector.username}
                        </Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.container_changeAvatar} onPress={pickDocument}>
                    <Text style={styles.txt_changeAvatar}>+</Text>
                </TouchableOpacity>
                <View style={[styles.infors]}>
                    <View style={styles.input_container}>
                        <Text style={styles.txt_email}>Email</Text>
                        <View style={styles.container_txt_input}>
                            <TextInput
                                style={styles.input}
                                value={email}
                                onChangeText={(text) => setEmail(text)}
                                editable={false}
                                focusable={false}
                            />
                        </View>
                    </View>

                    <View style={styles.input_container}>
                        <Text style={styles.txt_username}>Username</Text>
                        <View style={styles.container_txt_input}>
                            <TextInput
                                style={styles.input}
                                value={username}
                                onChangeText={(text) => setUsername(text)}
                                editable={false}
                                focusable={false}
                            />
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
                        </View>
                    </View>
                    <View
                        style={[
                            styles.input_container,
                            {
                                justifyContent: "space-between",
                            },
                        ]}
                    ></View>
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
    input: {
        width: "100%",
    },
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
    container_changeAvatar: {
        width: 50,
        height: 50,
        margin: "auto",
        borderRadius: 3000,
        backgroundColor: "#f8f8f8",
        position: "relative",
        top: 36,
        left: 36,
        borderWidth: 2,
    },
    txt_changeAvatar: {
        textAlign: "center",
        color: "#000",
        fontSize: 32,
        fontWeight: "700",
        margin: "auto",
    },
    fileDetails: {
        marginTop: 20,
        padding: 10,
        backgroundColor: "#f8f8f8",
        borderRadius: 8,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    fileText: {
        fontSize: 14,
        color: "#333",
        marginVertical: 4,
    },
});
