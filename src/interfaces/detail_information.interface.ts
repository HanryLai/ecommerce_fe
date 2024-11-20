import { IBaseEntity } from "./base.entities.interface";

export interface IDetailInformationEntity extends IBaseEntity {
    phone: string;
    full_name: string;
    address: string;
    avatar_url: string;
}
