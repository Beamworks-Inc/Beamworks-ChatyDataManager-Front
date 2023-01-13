import { Folder } from "interfaces/Content.interface";
import axios, { AxiosResponse } from "axios";

interface FoldersAPI {
	findAllRoot: () => Promise<AxiosResponse<Folder[]>>;
	findById: (folderId: number) => Promise<AxiosResponse<Folder>>;
	// update: (folderId: number, folder: Folder) => Promise<AxiosResponse<Folder>>; // @deprecated
	changeName: (
		folderId: number,
		name: string
	) => Promise<AxiosResponse<Folder>>;
	addChild: (folderId: number, name: string) => Promise<AxiosResponse<Folder>>;
	create: (folder: Folder) => Promise<AxiosResponse<Folder>>;
	delete: (folderId: number) => Promise<AxiosResponse<Folder>>; // empty string will come when there's no folder
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
	 * @returns
	 */
	findAllRoot: (): Promise<AxiosResponse<Folder[]>> => axios.get(`${URI}`),

	/**
	 * folderId에 해당하는 폴더를 가져옵니다.
	 * @param folderId
	 * @returns
	 */
	findById: (folderId: number): Promise<AxiosResponse<Folder>> =>
		axios.get(`${URI}/${folderId}`),

	/**
	 * 루트 폴더를 추가합니다.
	 * @param folder
	 * @returns
	 */
	create: (folder: Folder) => axios.post(`${URI}`, folder),

	/**
	 * folderId에 해당하는 폴더의 이름을 변경합니다.
	 * @param folderId
	 * @param name
	 * @returns
	 */
	changeName: (
		folderId: number,
		name: string
	): Promise<AxiosResponse<Folder>> =>
		axios.put(`${URI}/changeName/${folderId}/${name}`),

	/**
	 * folderId에 해당하는 폴더에 자식폴더를 추가합니다.
	 * @param folderId
	 * @param name
	 * @returns
	 */
	addChild: (folderId: number, name: string): Promise<AxiosResponse<Folder>> =>
		axios.put(`${URI}/addChild/${folderId}/${name}`),

	/**
	 * folderId에 해당하는 폴더를 삭제합니다.
	 * 루트가 삭제될 경우 null 값을 받아옵니다.
	 * @param folderId
	 * @returns
	 */
	delete: (folderId: number): Promise<AxiosResponse<Folder | null>> =>
		axios.delete(`${URI}/${folderId}`),

	/**
	 * 모든 루트폴더를 삭제합니다.
	 * @returns
	 */
	deleteAll: (): Promise<AxiosResponse<null>> => axios.delete(`${URI}`),
};

export default FoldersAPI;
