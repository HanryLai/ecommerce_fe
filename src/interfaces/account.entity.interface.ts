import { IBaseEntity } from "./base.entities.interface";

export interface IAccountEntity extends IBaseEntity {
    id: string;
    email: string;
    username: string;
    password: string;
    url_avatar: string;
    address: string;
    phone: string;
    role: string;
    fullname: string;
}
