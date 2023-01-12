import { Folder } from "interfaces/Content.interface";
import axios, { AxiosResponse } from "axios";

interface FoldersAPI {
	findAllRoot: () => Promise<AxiosResponse<Folder[]>>;
	findById: (folderId: number) => Promise<AxiosResponse<Folder>>;
	update: (folderId: number, folder: Folder) => Promise<AxiosResponse<Folder>>;
	create: (folder: Folder) => Promise<AxiosResponse<Folder>>;
	delete: (folderId: number) => Promise<AxiosResponse<null>>;
	deleteAll: () => Promise<AxiosResponse<null>>;
}
const URI = "/api/v1/folder";
/**
 * axios 를 이용하여 서버에 Folder 관련 요청을 보내는 함수들을 정의합니다.
 * @example
 * ```typescript
 * FoldersAPI.findAllRoot()
 *  .then((res)=>{console.log(res.data)})
 *  .error((err)=>{console.log(err)})
 * ```
 */
const FoldersAPI: FoldersAPI = {
	/**
	 * 모든 루트 폴더를 가져옵니다.
	 */
	findAllRoot: () => axios.get(`${URI}`),
	findById: (folderId: number) => axios.get(`${URI}/${folderId}`),
	create: (folder: Folder) => axios.post(`${URI}`, folder),
	/**
	 * @param folderId : 변경할 폴더의 아이디 입니다.
	 * @param folder :  변경할 폴더의 내용입니다.
	 */
	update: (folderId: number, folder: Folder) =>
		axios.put(`${URI}/${folderId}`, folder),
	delete: (folderId: number) => axios.delete(`${URI}/${folderId}`),
	deleteAll: () => axios.delete(`${URI}`),
};

export default FoldersAPI;
