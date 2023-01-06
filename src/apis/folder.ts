import api from "./index";
import { Folder } from "interfaces/Content.interface";
import {AxiosResponse} from "axios";

interface IFoldersAPI {
    findAllRoot: ()=>Promise<AxiosResponse<Folder[]>>,
    find: (folderId: string)=>Promise<AxiosResponse<Folder>>,
    update: (folder: Folder)=>Promise<AxiosResponse<null>>,
    create: (folder: Folder)=>Promise<AxiosResponse<null>>,
    delete: (folderId: string)=>Promise<AxiosResponse<null>>,
    deleteAll : ()=>Promise<AxiosResponse<null>>,
}
const URI = "/folder";
/**
 * axios 를 이용하여 서버에 요청을 보내는 함수들을 정의합니다.
 * @example
 * ```typescript
 * FoldersAPI.findAllRoot()
 *  .then((res)=>{console.log(res.data)})
 *  .error((err)=>{console.log(err)})
 * ```
 */
const FoldersAPI: IFoldersAPI = {
  findAllRoot: ()=> api.get(`${URI}`),
  find: (folderId: string) => api.get(`${URI}/${folderId}`),
  create: (folder: Folder) => api.post(`${URI}`, folder),
  update: (folder: Folder) => api.put(`${URI}/1`, folder),
  delete: (folderId: string) => api.delete(`${URI}/${folderId}`),
  deleteAll: ()=>api.delete(`${URI}`),
}

export default FoldersAPI;
const a:Folder = {
    name: "init",
    children: [],
}