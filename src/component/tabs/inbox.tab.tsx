import { useEffect, useRef, useState } from "react";
import {
    ImageBackground,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import io, { Socket, WebSocket } from "socket.io-client";
import { MessageInterface } from "../../interfaces";
import { PropsTab } from "../../utils/types";

export interface TestMessage {
    username: string;
    message: string;
}

export const Inbox = ({ navigation, route }: PropsTab<"Inbox">) => {
    const [messages, setMessages] = useState<TestMessage[]>([]);
    const [newMessage, setNewMessage] = useState<string>("");
    const socketUrl = "http://192.168.1.6:6996";
    let socket: WebSocket | null = null;
    // useEffect(() => {
    //     // Establish WebSocket connection
    //     socket = new WebSocket(socketUrl);

    //     // Handle connection open
    //     socket.onopen = () => {
    //         console.log("Connected to WebSocket");
    //     };

    //     // Handle incoming messages
    //     socket.onmessage = (event) => {
    //         const parsedData = JSON.parse(event.data);

    //         // Check if the event is "events" (or any other event name)
    //         if (parsedData.event === "events") {
    //             const messageData = parsedData.data;
    //             setMessages((prevMessages) => [...prevMessages, messageData]);
    //         }
    //     };

    //     // Handle errors
    //     socket.onerror = (error) => {
    //         console.error("WebSocket error:", error);
    //     };

    //     // Handle connection close
    //     socket.onclose = () => {
    //         console.log("WebSocket disconnected");
    //     };

    //     // Cleanup on unmount
    //     return () => {
    //         if (socket) socket.close();
    //     };
    // }, [socketUrl]);

    // Send a message to the server in the required format
    const sendMessage = () => {
        // if (socket && socket.readyState === WebSocket.OPEN) {
        //     const message = {
        //         event: "events",
        //         data: {
        //             username: username,
        //             message: newMessage,
        //         },
        //     };
        //     socket.send(JSON.stringify(message));
        //     setNewMessage(""); // Clear input after sending
        // } else {
        //     console.log("WebSocket not connected");
        // }
    };

    return (
        <ImageBackground
            source={require("../../../assets/components/chat/background.png")}
            resizeMode="cover"
            style={styles.container}
        >
            <View style={styles.scrollContainer}>
                <View style={styles.container_title}>
                    <Text style={styles.title}>Support | Admin</Text>
                </View>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.messagesContainer}>
                        {messages.map((msg, index) => (
                            <Text key={index} style={styles.message}>
                                {msg.username}: {msg.message}
                            </Text>
                        ))}
                    </View>
                </ScrollView>
                <TextInput
                    style={styles.input}
                    value={newMessage}
                    onChangeText={setNewMessage}
                    placeholder="Type your message..."
                />
                <TouchableOpacity onPress={() => sendMessage()} style={styles.sendButton}>
                    <Text style={styles.sendButtonText}>Send</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: "space-between",
    },
    container_title: {
        padding: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    messagesContainer: {
        flex: 1,
        padding: 10,
    },
    message: {
        fontSize: 16,
        marginVertical: 5,
        color: "#fff",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        margin: 10,
        borderRadius: 5,
        color: "#fff",
    },
    sendButton: {
        backgroundColor: "#007BFF",
        padding: 10,
        margin: 10,
        borderRadius: 5,
        alignItems: "center",
    },
    sendButtonText: {
        color: "#fff",
        fontSize: 16,
    },
});

// src/Chat.tsx
// import React, { useState, useEffect } from "react";
// import { View, Text, TextInput, Button, FlatList, StyleSheet } from "react-native";
// import { io, Socket } from "socket.io-client";
// import { PropsTab } from "../../utils/types";

// interface Message {
//     user: string;
//     message: string;
// }

// export const Inbox = ({ navigation, route }: PropsTab<"Inbox">) => {
//     const [socket, setSocket] = useState<Socket | null>(null);
//     const [messages, setMessages] = useState<Message[]>([]);
//     const [message, setMessage] = useState<string>("");
//     const [sender, setSender] = useState<string>(""); // Có thể thay đổi thành tên người dùng thực tế
//     let newSocket: Socket;
//     useEffect(() => {
//         // Initialize WebSocket connection
//         newSocket = io("ws://192.168.1.3:6996");
//         setSocket(newSocket);

//         newSocket.on("message", (data: Message) => {
//             console.log("received event:", data);
//             setMessages((prevMessages) => [...prevMessages, data]);
//         });

//         newSocket.on("connect", () => {
//             console.log("a user connected");
//         });

//         newSocket.on("disconnect", () => {
//             console.log("user disconnected");
//         });

//         newSocket.on("connect_error", (error: any) => {
//             console.log("Connection Error: ", error);
//         });

//         return () => {
//             if (newSocket) {
//                 newSocket.disconnect();
//             }
//         };
//     }, []);

//     const handleSendMessage = () => {
//         if (socket && message) {
//         }
//     };

//     return (
//         <View style={styles.container}>
//             <FlatList
//                 data={messages}
//                 keyExtractor={(item, index) => index.toString()}
//                 renderItem={({ item }) => (
//                     <View style={styles.messageContainer}>
//                         <Text style={styles.sender}>{item.user}: </Text>
//                         <Text>{item.message}</Text>
//                     </View>
//                 )}
//             />
//             <TextInput
//                 style={styles.input}
//                 placeholder="Nhập tin nhắn..."
//                 value={message}
//                 onChangeText={setMessage}
//             />
//             <TextInput
//                 style={styles.input}
//                 placeholder="user."
//                 value={sender}
//                 onChangeText={setSender}
//             />
//             <Button title="Gửi" onPress={handleSendMessage} />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 10,
//     },
//     messageContainer: {
//         flexDirection: "row",
//         marginBottom: 5,
//     },
//     sender: {
//         fontWeight: "bold",
//     },
//     input: {
//         borderWidth: 1,
//         borderColor: "#ccc",
//         padding: 10,
//         marginVertical: 10,
//         borderRadius: 5,
//     },
// });
