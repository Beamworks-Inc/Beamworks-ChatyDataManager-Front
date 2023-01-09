// type & interfaces
import {
	ContentReducerState,
	Content,
	Reference,
	RationaleDescription,
} from "interfaces/Content.interface";

// state
const INIT_CONTENT_STATE: ContentReducerState = {
	currentContent: {
		id: "0",
		folder: { id: 0, name: "응급처치", children: [] },
		question: "",
		answer: "",
		keywords: [],
		reference: new Array(6).fill({ title: "", description: "", link: "" }),
		rationale: {
			file: new Array(6).fill(""),
			description: new Array(6).fill({ description: "", link: "" }),
		},
		writer: { name: "" },
		writeDate: null,
		reviewer: { name: "" },
		reviewDate: null,
		reviewComment: "",
	},
	contentListState: [
		{
			id: "0",
			folder: { id: 0, name: "init", children: [] },
			question: "sample question",
			answer: "sample answer",
			reference: [],
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
	menuItems: {
		id: "0",
		name: "응급1",
		isEditMode: false,
		children: [],
	},
};

// action type
const HEADER = "ContentReducer";
const TYPE = {
	SET_CONTENT_LIST_STATE: `${HEADER}/SET_CONTENT_LIST_STATE` as const,
	SET_CURRENT_CONTENT: `${HEADER}/SET_CURRENT_CONTENT` as const,
	SET_CURRENT_CONTENT_REFERENCES:
		`${HEADER}/SET_CURRENT_CONTENT_REFERENCES` as const,
	SET_CURRENT_CONTENT_RATIONALE_DESCRIPTIONS:
		`${HEADER}/SET_CURRENT_CONTENT_RATIONALE_DESCRIPTIONS` as const,
};

// action creator
export const ContentAction = {
	setCurrentContent: (content: Content) => ({
		type: TYPE.SET_CURRENT_CONTENT,
		payload: content,
	}),
	setCurrentContentReferences: (references: Reference[]) => ({
		type: TYPE.SET_CURRENT_CONTENT_REFERENCES,
		payload: references,
	}),
	setCurrentContentRationaleDescriptions: (
		descriptions: RationaleDescription[]
	) => ({
		type: TYPE.SET_CURRENT_CONTENT_RATIONALE_DESCRIPTIONS,
		payload: descriptions,
	}),
	setContentList: (contentList: Content[]) => ({
		type: TYPE.SET_CONTENT_LIST_STATE,
		payload: contentList,
	}),
};

// reducer
export default function ContentReducer(
	state: ContentReducerState = INIT_CONTENT_STATE,
	action: any
): any {
	switch (action.type) {
		case TYPE.SET_CONTENT_LIST_STATE:
			return { ...state, contentListState: action.payload };
		case TYPE.SET_CURRENT_CONTENT:
			return { ...state, currentContent: action.payload };
		case TYPE.SET_CURRENT_CONTENT_REFERENCES:
			return {
				// key here
				...state,
				currentContent: {
					// key here
					...state.currentContent,
					reference: action.payload, // IMPORTANT: reference가 아닌 다른 key값들(key here)은 destructing 문법의 특징으로 인해 참조타입의 value를 가지더라도 그 참조가 변하지 않는다.
				},
			};
		case TYPE.SET_CURRENT_CONTENT_RATIONALE_DESCRIPTIONS:
			// QUESTION: 이렇게 복잡한데 이 방식이 맞는가 싶다.
			return {
				...state,
				currentContent: {
					...state.currentContent,
					rationale: {
						...state.currentContent.rationale,
						description: action.payload,
					},
				},
			};
		default:
			return state;
	}
}
