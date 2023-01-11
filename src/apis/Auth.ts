import axios, {AxiosResponse} from "axios";
import {User} from "../interfaces/Content.interface";
export type Role = "USER" | "REVIEWER" | "ADMIN";
export interface IAuthAPI{
    getUserInfo:()=>Promise<AxiosResponse<User>>,
    updateUserRole:(role : Role)=>Promise<AxiosResponse<null>>,
}

const URI = "/api/v1/user";

const AuthAPI: IAuthAPI = {
    getUserInfo:()=>axios.get<User>(`${URI}`),
    updateUserRole:(role : Role)=>axios.post(`${URI}/role/${role}`),
}

export default AuthAPI;