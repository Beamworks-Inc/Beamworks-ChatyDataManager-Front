import { Content } from "interfaces/Content.interface";
import axios, { AxiosResponse } from "axios";
interface KeywordDto {
	name : string,
	count : number
}
interface IContentsAPI {
	findAllByFolderId: (folderId: number) => Promise<AxiosResponse<Content[]>>;
	findByContentId: (contentId: number) => Promise<AxiosResponse<Content>>;
	create: (content: Content) => Promise<AxiosResponse<null>>;
	update: (content: Content) => Promise<AxiosResponse<null>>;
	delete: (contentId: number) => Promise<AxiosResponse<null>>;
	updateApprovedContentsToChatBot: () => Promise<AxiosResponse<null>>;
	//새로 추가
	findAllKeywordList:()=> Promise<AxiosResponse<KeywordDto[]>>;
	findAllReviewerKeywordList:()=> Promise<AxiosResponse<KeywordDto[]>>;
	findAllContentsContainKeyword:(keyword:string[])=> Promise<AxiosResponse<Content[]>>;
	findAllContentsContainReviewerKeyword:(keyword:string[])=> Promise<AxiosResponse<Content[]>>;
}

const URI = "/api/v1/contents";
/**
 * axios 를 이용하여 서버에 Contents 관련 요청을 보내는 함수들을 정의합니다.
 * @example
 * ```typescript
 * ContentsAPI.findAllByFolderId("1")
 *  .then((res)=>{console.log(res.data)})
 *  .error((err)=>{console.log(err)})
 * ```
 */
const ContentsAPI: IContentsAPI = {
	/**
	 * 폴더에 포함된 모든 컨텐츠를 가져옵니다.
	 * @param folderId
	 */
	findAllByFolderId: (folderId: number) =>
		axios.get(`${URI}/findAllByFolderId/${folderId}`),
	findByContentId: (contentId: number) =>
		axios.get(`${URI}/findByContentsId/${contentId}`), //REMEMBER: 7 to var
	/**
	 * Content 생성시에는 folderId 를 반드시 포함해야 하며, contentId 는 null 로 설정되어야 합니다.
	 * Review 와 같이 생성시에 데이터를 가지고 있지 않은 경우 null 로 설정합니다.
	 * @param content
	 */
	create: (content: Content) => axios.post(`${URI}`, content),
	/**
	 * Content 수정시에는 contentId 를 반드시 포함해야 합니다.
	 * @param content
	 */
	update: (content: Content) => axios.put(`${URI}`, content),
	delete: (contentId: number) => axios.delete(`${URI}/${contentId}`),
	updateApprovedContentsToChatBot : () => axios.post(`${URI}/updateApprovedDataToChatBot`),
	findAllKeywordList: ()=>axios.get(`${URI}/findAllKeywordList`),
	findAllReviewerKeywordList: ()=>axios.get(`${URI}/findAllReviewerKeywordList`),
	findAllContentsContainKeyword: (keyword:string[])=>axios.get(`${URI}/findAllContentsContainKeyword/${keyword}`),
	findAllContentsContainReviewerKeyword: (keyword:string[])=>axios.get(`${URI}/findAllContentsContainReviewerKeyword/${keyword}`),
};

export default ContentsAPI;
