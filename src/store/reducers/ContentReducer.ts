// type & interfaces
import { IContentState, IContent } from "interfaces/Content.interface";

// state
const INIT_CONTENT_STATE: IContentState = {
  contentListState: [
    {
      id: "0",
      folder: { name: "init", children: [] },
      question: "init",
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
      reviewer: { name: "init" },
      reviewDate: new Date(),
      reviewComment: "init",
    },
  ],
};

// action type
const HEADER = "ContentReducer";
const TYPE = {
  SET_CONTENT_LIST_STATE: `${HEADER}/SET_CONTENT_LIST_STATE` as const,
};

// action creator
export const ContentAction = {
  setContentList: (contentList: IContent[]) => ({
    type: TYPE.SET_CONTENT_LIST_STATE,
    payload: contentList,
  }),
};

// reducer
export default function ContentReducer(
  state: IContentState = INIT_CONTENT_STATE,
  action: any
): any {
  switch (action.type) {
    case TYPE.SET_CONTENT_LIST_STATE:
      return { ...state, contentListState: action.payload };
    default:
      return state;
  }
}
