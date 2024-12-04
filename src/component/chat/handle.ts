import axios from "axios";
import api from "../../utils/axios/api-be";
import { accountHook, useAppSelector } from "../../utils/redux";
import { IAccountEntity } from "../../interfaces";
export interface BaseAxiosResponse<T> {
    data: T | null;
    statusCode: number;
    message: string;
}
export const fetchChatRoom = async (account: IAccountEntity) => {
    try {
        const response = await api.get(`/rooms`, {
            headers: {
                Authorization: `Bearer ${account.accessToken}`,
            },
        });
        const data: BaseAxiosResponse<
            {
                roomId: string;
                userId: string;
                avatar: string;
                name: string;
                lastMessage: {
                    message: string;
                    senderId: string;
                };
            }[]
        > = {
            data: response.data.data,
            statusCode: response.data.status,
            message: response.data.message,
        };
        return data;
    } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error)) {
            const data: BaseAxiosResponse<
                {
                    roomId: string;
                    userId: string;
                    avatar: string;
                    name: string;
                    lastMessage: {
                        message: string;
                        senderId: string;
                    };
                }[]
            > = {
                data: [],
                statusCode: 500,
                message: error.message,
            };
            return data;
        }
    }
};
