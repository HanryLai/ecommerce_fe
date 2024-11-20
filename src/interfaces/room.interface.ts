import { MessageInterface } from "./message.interface";

export interface RoomInterface {
    id: string;
    name: string;
    messages: MessageInterface[];
}
