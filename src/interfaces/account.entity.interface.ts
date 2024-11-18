import { IBaseEntity } from "./base.entities.interface";
import { IDetailInformationEntity } from "./detail_information.interface";
import { IRoleEntity } from "./role.entity.interface";

export interface IAccountEntity extends IBaseEntity {
    email: string;
    username: string;
    password: string;
    isVerify: boolean;
    isActive: boolean;
    accessToken: string;
    refreshToken: string;
    detail_information_id: IDetailInformationEntity;
    role: IRoleEntity;
}
