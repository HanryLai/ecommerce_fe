import { IBaseEntity } from "./base.entities.interface";

export interface IAccountEntity extends IBaseEntity {
    id: string;
    email: string;
    username: string;
    url_avatar: string;
    password: string;
}
