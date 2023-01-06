import api from "./index";
import { Content } from "interfaces/Content.interface";
import axios, {AxiosResponse} from "axios";

interface ContentsAPI{
    getContents: Promise<AxiosResponse<any,any>>,

}
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
