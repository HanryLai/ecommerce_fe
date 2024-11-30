import React, { useState, useEffect } from "react";
import { View, FlatList, Pressable, ActivityIndicator } from "react-native";
import { io, Socket } from "socket.io-client";
import { Text, TextInput } from "react-native-paper";
import { NavigationProp, useIsFocused, useNavigation } from "@react-navigation/native";
import { accountHook, detailInformationHook, useAppSelector } from "../../utils/redux";
import { NavigationStackParamList } from "../../utils/types";
import { URL_BE_SOCKET } from "../../../env";
import { Color } from "../../style";
import { ChatComponent } from "./inbox-child.tab";

interface Message {
    sender: string;
    message: string;
    image?: string;
}

export const Inbox: React.FC = () => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const navigation = useNavigation<NavigationProp<NavigationStackParamList>>();

    const [message, setMessage] = useState<string>("");
    const account = useAppSelector(accountHook);
    const accessToken = account.accessToken;

    const accountId = account.id;

    const detailInformation = useAppSelector(detailInformationHook);
    const focus = useIsFocused();
    useEffect(() => {
        setMessages([]);
        const token = async () => {
            if (!accessToken) {
                return;
            }
            const newSocket = io(`${URL_BE_SOCKET}`, {
                transports: ["websocket"],
                extraHeaders: {
                    authorization: accessToken ? `${accessToken}` : "",
                },
            });

            newSocket.emit("joinRoom", {
                owner_id: accountId,
            });

            newSocket.on("oldMessages", (messages: any) => {
                const messageArray: Message[] = messages.messages.map((message: any) => {
                    return {
                        sender: message.account.id,
                        message: message.content,
                    };
                });

                setMessages(messageArray);
                setLoading(false);
            });
            setSocket(newSocket);
            console.log("connected");
        };

        if (focus) {
            setLoading(true);
        }
        if (accessToken) {
            token();
        } else {
            navigation.navigate("login");
        }

        if (socket && focus === false) {
            socket.disconnect();
        }
    }, [focus]);

    useEffect(() => {
        if (socket) {
            socket.on("message", (message: any) => {
                setMessages((prev) => [
                    ...prev,
                    {
                        sender: message.sender.id,
                        message: message.message,
                    },
                ]);
            });
        }
    }, [socket?.on]);

    const handleSendMessage = () => {
        if (socket && message) {
            socket.emit("message", {
                content: message,
            });

            setMessage("");
        }
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
                        justifyContent: "flex-end",
                    }}
                >
                    <FlatList
                        inverted
                        style={{ paddingHorizontal: 8 }}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        scrollEnabled={true}
                        data={messages.toReversed()}
                        renderItem={({ item }) => (
                            <ChatComponent
                                message={item.message}
                                image={
                                    item.sender === accountId
                                        ? detailInformation?.avatar_url
                                            ? detailInformation.avatar_url
                                            : "https://i.pinimg.com/736x/e9/6f/fb/e96ffb0a7aba1f17f686a15f368b5d58.jpg"
                                        : "https://i.pinimg.com/736x/e9/6f/fb/e96ffb0a7aba1f17f686a15f368b5d58.jpg"
                                }
                                sender={item.sender === accountId ? "sending" : "receiving"}
                            />
                        )}
                    />
                    <View
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                            gap: 8,
                            flexDirection: "row",
                            paddingHorizontal: 8,
                        }}
                    >
                        <TextInput
                            style={{ height: 40, flex: 1 }}
                            placeholder="Message"
                            mode="outlined"
                            contentStyle={{ paddingVertical: 2 }}
                            activeOutlineColor={Color.primary}
                            value={message}
                            onChangeText={(text) => setMessage(text)}
                        />
                        <Pressable
                            onPress={handleSendMessage}
                            style={{
                                backgroundColor: Color.primary,
                                borderRadius: 4,
                                padding: 8,
                            }}
                        >
                            <Text>Send</Text>
                        </Pressable>
                    </View>
                </View>
            )}
        </View>
    );
};
