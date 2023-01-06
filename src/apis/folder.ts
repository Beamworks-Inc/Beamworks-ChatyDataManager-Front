import api from "./index";
import { Folder } from "interfaces/Content.interface";
import {AxiosResponse} from "axios";

interface IFoldersAPI {
    findAllRoot: ()=>Promise<AxiosResponse<Folder[]>>,
    findById: (folderId: string)=>Promise<AxiosResponse<Folder>>,
    update: (folderId : number, folder: Folder)=>Promise<AxiosResponse<null>>,
    create: (folder: Folder)=>Promise<AxiosResponse<null>>,
    delete: (folderId: number)=>Promise<AxiosResponse<null>>,
    deleteAll : ()=>Promise<AxiosResponse<null>>,
}
const URI = "/folder";
/**
 * axios 를 이용하여 서버에 Folder 관련 요청을 보내는 함수들을 정의합니다.
 * @example
 * ```typescript
 * FoldersAPI.findAllRoot()
 *  .then((res)=>{console.log(res.data)})
 *  .error((err)=>{console.log(err)})
 * ```
 */
const FoldersAPI: IFoldersAPI = {
    /**
     * 모든 루트 폴더를 가져옵니다.
     */
  findAllRoot: ()=> api.get(`${URI}`),
  findById: (folderId: string) => api.get(`${URI}/${folderId}`),
  create: (folder: Folder) => api.post(`${URI}`, folder),
    /**
     * @param folderId : 변경할 폴더의 아이디 입니다.
     * @param folder :  변경할 폴더의 내용입니다.
     */
  update: (folderId : number, folder: Folder) => api.put(`${URI}/${folderId}`, folder),
  delete: (folderId: number) => api.delete(`${URI}/${folderId}`),
  deleteAll: ()=>api.delete(`${URI}`),
}

export default FoldersAPI;