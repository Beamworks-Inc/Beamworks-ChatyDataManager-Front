import api from "./index";
import { Content } from "interfaces/Content.interface";
import axios, {AxiosResponse} from "axios";

interface IContentsAPI{
    findAllByFolderId: (folderId: string)=>Promise<AxiosResponse<Content[]>>,
    findByContentId: (contentId: string)=>Promise<AxiosResponse<Content>>,
    create: (content: Content)=>Promise<AxiosResponse<null>>,
    update: (content: Content)=>Promise<AxiosResponse<null>>,
    delete: (contentId: number)=>Promise<AxiosResponse<null>>,
}

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
  findAllByFolderId: (folderId: string) => api.get(`/findAllByFolderId/${folderId}`),
  findByContentId: (contentId: string) => api.get(`/findByContentId/${contentId}`),
  create: (content: Content) => api.post(`/content`, content),
  update: (content: Content) => api.put(`/content`, content),
  delete: (contentId: number) => api.delete(`/content/${contentId}`),
}

export default ContentsAPI;
// Content
export const apiGetContentListByFolderName = async (
  folderName: string | undefined,
  isStub: boolean = false
) => {
  if (isStub) {
    if (folderName === "예방1") {
      return [
        {
          id: "1",
          folder: { name: "init", children: [] },
          question: "예방1 질문",
          answer: "init",
          reference: [
            {
              title: "init",
              description: "init",
              link: new URL("https://www.google.com"),
            },
          ],
          rationale: {
            file: [new URL("https://www.google.com")],
            description: [
              { description: "init", link: new URL("https://www.google.com") },
            ],
          },
          writeDate: new Date(),
          writer: { name: "init" },
          review: {
            reviewer: { name: "init" },
            reviewDate: new Date(),
            reviewComment: "init",
          },
          keywords: ["init"],
          state: "draft",
        },
      ];
    } else if (folderName === "응급1") {
      return [
        {
          id: "1",
          folder: { name: "init", children: [] },
          question: "응급1 질문",
          answer: "init",
          reference: [
            {
              title: "init",
              description: "init",
              link: new URL("https://www.google.com"),
            },
          ],
          rationale: {
            file: [new URL("https://www.google.com")],
            description: [
              { description: "init", link: new URL("https://www.google.com") },
            ],
          },
          writeDate: new Date(),
          writer: { name: "init" },
          review: {
            reviewer: { name: "init" },
            reviewDate: new Date(),
            reviewComment: "init",
          },
          keywords: ["init"],
          state: "draft",
        },
      ];
    } else {
      return [];
    }
  }

  const url = `/content/${folderName}`;
  try {
    const response = await api.get<Content[]>(url);
    return response.data;
  } catch (error: any) {
    const { status, statusText } = error.response;
    alert(`Error: (apiGetContentListByFolderName), ${status} ${statusText}`);
    return [];
  }
};