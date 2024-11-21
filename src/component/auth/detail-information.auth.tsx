import { useEffect, useState } from "react";
import {
    Alert,
    Button,
    Image,
    ScrollView,
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
            .then((res) => res.data.data)
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
                type: "image/*",
                copyToCacheDirectory: true,
            });

            if (result.canceled === false) {
                setFile({
                    uri: result.assets[0].uri,
                    name: result.assets[0].name,
                    size: result.assets[0].size ?? 0,
                    type: result.assets[0].mimeType ?? "unknown",
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
                    Alert.alert("Something went wrong");
                } else {
                    Alert.alert("Update successful");
                }
                fetchDetailInformation();
                setIsEdit(false);
            })
            .catch((err) => console.log(JSON.stringify(err)));
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.avatarContainer}>
                <View style={styles.avatarWrapper}>
                    {detailSelector?.avatar_url ? (
                        <>
                            {file?.uri ? (
                                <Image
                                    style={styles.avatar}
                                    source={{ uri: file?.uri || url_avatar }}
                                />
                            ) : (
                                <Image style={styles.avatar} source={{ uri: url_avatar }} />
                            )}
                        </>
                    ) : (
                        <>
                            {file?.uri ? (
                                <Image
                                    style={styles.avatar}
                                    source={{ uri: file?.uri || url_avatar }}
                                />
                            ) : (
                                <Image
                                    style={styles.avatar}
                                    source={require("../../../assets/auth/default-avatar.png")}
                                />
                            )}
                        </>
                    )}
                </View>

                <Text style={styles.fullNameText}>
                    {detailSelector?.full_name || accountSelector.username}
                </Text>
            </View>

            <TouchableOpacity style={styles.changeAvatarButton} onPress={pickDocument}>
                <Text style={styles.changeAvatarText}>+</Text>
            </TouchableOpacity>

            <View style={styles.formContainer}>
                <FormInput label="Email" value={email} editable={false} />
                <FormInput label="Username" value={username} editable={false} />
                <FormInput
                    label="Full Name"
                    value={fullname}
                    onChangeText={setFullname}
                    editable={isEdit}
                />
                <FormInput label="Phone" value={phone} onChangeText={setPhone} editable={isEdit} />
                <FormInput
                    label="Address"
                    value={address}
                    onChangeText={setAddress}
                    editable={isEdit}
                />
            </View>

            {isEdit ? (
                <View style={styles.actionsContainer}>
                    <ActionButton
                        text="Cancel"
                        onPress={() => {
                            fetchAccountOrigin();
                            setIsEdit(false);
                        }}
                    />
                    <ActionButton text="Confirm" onPress={updateAccount} />
                </View>
            ) : (
                <ActionButton text="Update" onPress={() => setIsEdit(true)} />
            )}
        </ScrollView>
    );
};

const FormInput = ({
    label,
    value,
    editable = true,
    onChangeText,
}: {
    label: string;
    value: string;
    editable?: boolean;
    onChangeText?: (text: string) => void;
}) => (
    <View style={styles.inputContainer}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChangeText}
            editable={editable}
        />
    </View>
);

const ActionButton = ({ text, onPress }: { text: string; onPress: () => void }) => (
    <TouchableOpacity style={styles.actionButton} onPress={onPress}>
        <Text style={styles.actionButtonText}>{text}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#f9f9f9",
    },
    avatarContainer: {
        alignItems: "center",
        marginVertical: 20,
    },
    avatarWrapper: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: "#ddd",
        alignItems: "center",
        justifyContent: "center",
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
    },
    fullNameText: {
        fontSize: 24,
        fontWeight: "600",
        marginTop: 10,
    },
    changeAvatarButton: {
        position: "absolute",
        top: 95,
        right: 95,
        backgroundColor: "#fff",
        borderRadius: 25,
        padding: 10,
        borderWidth: 1,
        borderColor: "#ddd",
    },
    changeAvatarText: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#000",
    },
    formContainer: {
        marginTop: 40,
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        color: "#333",
        marginBottom: 8,
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        paddingHorizontal: 10,
        fontSize: 16,
        backgroundColor: "#fff",
    },
    actionsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 30,
    },
    actionButton: {
        flex: 1,
        backgroundColor: "#000",
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 10,
    },
    actionButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
});

export default DetailInformationComponent;
