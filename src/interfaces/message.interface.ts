export interface MessageInterface {
    id?: string;
    content: string;
    user: {
        id?: string;
        url_avatar: string;
        username: string;
    };
}
