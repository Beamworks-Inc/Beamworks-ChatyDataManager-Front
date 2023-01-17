// type & interfaces
import {
	ContentReducerState,
	Content,
	Reference,
	RationaleDescription,
	Treeitem,
	KeywordDto,
} from "interfaces/Content.interface";

export const initialContent = {
	id: null,
	folderId: null,
	question: "",
	answer: "",
	keyword: [],
	reference: new Array(6).fill({
		id: null,
		title: "",
		description: "",
		link: "",
	}),
	rationale: {
		id: null,
		description: new Array(6).fill({ description: "", link: "" }),
		url: new Array(6).fill(""),
	},
	writer: null,
	writeDate: null,
	review: null,
	status: "DRAFT",
} as Content;

// state
const INIT_CONTENT_STATE: ContentReducerState = {
	currentContent: initialContent,
	contentListState: [],
	menuItems: null,
	keywordCategories: [],
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
	SET_MENU_ITEMS: `${HEADER}/SET_MENU_ITEMS` as const,
	SET_KEYWORD_CATEGORIES: `${HEADER}/SET_KEYWORD_CATEGORIES` as const,
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
	setMenuItems: (menuItems: Treeitem | null) => ({
		type: TYPE.SET_MENU_ITEMS,
		payload: menuItems,
	}),
	setKeywordCategories: (keywordCategories: KeywordDto[]) => ({
		type: TYPE.SET_KEYWORD_CATEGORIES,
		payload: keywordCategories,
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
		case TYPE.SET_MENU_ITEMS:
			return { ...state, menuItems: action.payload };
		case TYPE.SET_KEYWORD_CATEGORIES:
			return { ...state, keywordCategories: action.payload };
		default:
			return state;
	}
}
