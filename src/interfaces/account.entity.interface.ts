import { IBaseEntity } from "./base.entities.interface";
import { IDetailInformationEntity } from "./detail_information.interface";
import { IRoleEntity } from "./role.entity.interface";

export interface IAccountEntity {
    id: string;
    email: string;
    username: string;
    password: string;
    isVerify: boolean;
    isActive: boolean;
    accessToken: string;
    refreshToken: string;
    role: string;
}
