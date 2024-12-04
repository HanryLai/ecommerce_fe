import { FlatList, Image, Pressable, View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import { useEffect, useState } from "react";
import { NavigationProp, useIsFocused, useNavigation } from "@react-navigation/native";
import { fetchChatRoom } from "./handle";
import { NavigationStackParamList } from "../../utils/types";
import { accountHook, useAppSelector } from "../../utils/redux";
import { Color } from "../../style";
import { IAccountEntity } from "../../interfaces";

export interface ChatRoom {
    roomId: string;
    userId: string;
    avatar: string;
    name: string;
    lastMessage: {
        message: string;
        senderId: string;
    };
}

export const ListChat = () => {
    const [data, setData] = useState<ChatRoom[]>();
    const [loading, setLoading] = useState<boolean>(true);
    const navigation = useNavigation<NavigationProp<NavigationStackParamList>>();
    const account = useAppSelector(accountHook);

    const focus = useIsFocused();

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            const result = await fetchChatRoom(account);
            if (result?.data) {
                setData(result.data);
            }
            setLoading(false);
        };
        if (focus) {
            fetchData();
        }

        if (!focus) {
            setLoading(true);
            setData([]);
        }
    }, [focus]);

    const handlePress = (userId: string) => {
        navigation.navigate("ChatAdmin", { userId });
    };
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "flex-start",
                backgroundColor: "#fff",
            }}
        >
            {loading ? (
                <View style={{ flex: 1, justifyContent: "center" }}>
                    <ActivityIndicator size={"large"} color={Color.primary} />
                </View>
            ) : (
                <View
                    style={{
                        gap: 10,
                        flex: 1,
                    }}
                >
                    <FlatList
                        data={data}
                        renderItem={({ item }) => (
                            <Chat data={item} account={account} onPress={handlePress} />
                        )}
                        keyExtractor={(item) => item.roomId}
                        style={{
                            paddingVertical: 8,
                            backgroundColor: "#fff",
                        }}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            )}
        </View>
    );
};

const Chat = ({
    data,
    account,
    onPress,
}: {
    data: ChatRoom;
    account: IAccountEntity | null;
    onPress: (userId: string) => void;
}) => {
    return (
        <Pressable
            onPress={() => onPress(data.userId)}
            style={[
                {
                    flexDirection: "row",
                    gap: 8,
                    marginHorizontal: 8,
                    marginVertical: 4,
                    justifyContent: "flex-start",
                    alignItems: "center",
                    borderWidth: 1,
                    borderColor: "#ccc",
                    paddingVertical: 10,
                    paddingHorizontal: 12,
                    borderRadius: 12,
                    backgroundColor: "#fff",
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 1,
                    },
                    shadowOpacity: 0.22,
                    shadowRadius: 2.22,

                    elevation: 3,
                },
            ]}
        >
            <Image
                source={{
                    uri: data.avatar,
                }}
                width={70}
                height={70}
                style={{
                    width: 70,
                    height: 70,
                    borderRadius: 35,
                    borderWidth: 2,
                    borderColor: Color.primary,
                }}
            />
            <View style={{ flex: 1, gap: 2 }}>
                <Text style={{ fontSize: 26, fontWeight: "900" }}>{data.name}</Text>
                <Text numberOfLines={3}>
                    {data.lastMessage.senderId === account?.id
                        ? `You: ${data.lastMessage.message}`
                        : `${data.lastMessage.message}`}
                </Text>
            </View>
        </Pressable>
    );
};
