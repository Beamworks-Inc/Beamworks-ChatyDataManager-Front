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
	reviewerKeyword: "",
	reference: new Array(1).fill({
		id: null,
		title: "",
		description: "",
		link: "",
	}),
	rationale: {
		id: null,
		description: new Array(1).fill({ description: "", link: "" }),
		url: new Array(1).fill(""),
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
	selectedCategoryList: [],
	searchKeyword: "",
};

// action type
const HEADER = "ContentReducer";
const TYPE = {
	SET_SEARCH_KEYWORD: `${HEADER}/SET_SEARCH_KEYWORD` as const,
	SET_CONTENT_LIST_STATE: `${HEADER}/SET_CONTENT_LIST_STATE` as const,
	SET_CURRENT_CONTENT: `${HEADER}/SET_CURRENT_CONTENT` as const,
	SET_CURRENT_CONTENT_REFERENCES:
		`${HEADER}/SET_CURRENT_CONTENT_REFERENCES` as const,
	SET_CURRENT_CONTENT_RATIONALE_DESCRIPTIONS:
		`${HEADER}/SET_CURRENT_CONTENT_RATIONALE_DESCRIPTIONS` as const,
	SET_MENU_ITEMS: `${HEADER}/SET_MENU_ITEMS` as const,
	SET_KEYWORD_CATEGORIES: `${HEADER}/SET_KEYWORD_CATEGORIES` as const,
	SET_SELECTED_CATEGORY_LIST: `${HEADER}/SET_SELECTED_CATEGORY_LIST` as const,
	SET_REVIEWER_KEYWORD: `${HEADER}/SET_REVIEWER_KEYWORD` as const,
	SET_CURRENT_CONTENT_KEYWORDS:
		`${HEADER}/SET_CURRENT_CONTENT_KEYWORDS` as const,
	SET_CURRENT_CONTENT_RATIONALE_URL:
		`${HEADER}/SET_CURRENT_CONTENT_RATIONALE_URL` as const,
	ADD_RATIONAL_IMAGE: `${HEADER}/ADD_RATIONAL_IMAGE` as const,
	DELETE_RATIONAL_IMAGE: `${HEADER}/DELETE_RATIONAL_IMAGE` as const,
};

// action creator
export const ContentAction = {
	setSearchKeyword: (keyword: string) => ({
		type: TYPE.SET_SEARCH_KEYWORD,
		payload: keyword,
	}),
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
	setSelectedCategoryList: (selectedCategoryList: KeywordDto[]) => ({
		type: TYPE.SET_SELECTED_CATEGORY_LIST,
		payload: selectedCategoryList,
	}),
	setReviewerKeyword: (reviewerKeyword: string) => ({
		type: TYPE.SET_REVIEWER_KEYWORD,
		payload: reviewerKeyword,
	}),
	setCurrentContentKeywords: (keywords: string[]) => ({
		type: TYPE.SET_CURRENT_CONTENT_KEYWORDS,
		payload: keywords,
	}),
	setCurrentContentRationaleUrl: (urls: string[]) => ({
		type: TYPE.SET_CURRENT_CONTENT_RATIONALE_URL,
		payload: urls,
	}),
	addRationaleImage: (index: number) => ({
		type: TYPE.ADD_RATIONAL_IMAGE,
		payload: index,
	}),
	deleteRationaleImage: (index: number) => ({
		type: TYPE.DELETE_RATIONAL_IMAGE,
		payload: index,
	}),
};

// reducer
export default function ContentReducer(
	state: ContentReducerState = INIT_CONTENT_STATE,
	action: any
): any {
	if (action.type === TYPE.SET_SEARCH_KEYWORD) {
		return { ...state, searchKeyword: action.payload };
	} else if (action.type === TYPE.SET_CONTENT_LIST_STATE) {
		return { ...state, contentListState: action.payload };
	} else if (action.type === TYPE.SET_CURRENT_CONTENT) {
		return { ...state, currentContent: action.payload };
	} else if (action.type === TYPE.SET_CURRENT_CONTENT_REFERENCES) {
		return {
			...state,
			currentContent: {
				...state.currentContent,
				reference: action.payload,
			},
		};
	} else if (action.type === TYPE.SET_CURRENT_CONTENT_RATIONALE_DESCRIPTIONS) {
		return {
			...state,
			currentContent: {
				...state.currentContent,
				rationale: {
					...state.currentContent?.rationale,
					description: action.payload,
				},
			},
		};
	} else if (action.type === TYPE.SET_MENU_ITEMS) {
		return { ...state, menuItems: action.payload };
	} else if (action.type === TYPE.SET_KEYWORD_CATEGORIES) {
		return { ...state, keywordCategories: action.payload };
	} else if (action.type === TYPE.SET_SELECTED_CATEGORY_LIST) {
		return { ...state, selectedCategoryList: action.payload };
	} else if (action.type === TYPE.SET_REVIEWER_KEYWORD) {
		return {
			...state,
			currentContent: {
				...state.currentContent,
				reviewerKeyword: action.payload,
			},
		};
	} else if (action.type === TYPE.SET_CURRENT_CONTENT_KEYWORDS) {
		return {
			...state,
			currentContent: {
				...state.currentContent,
				keyword: action.payload,
			},
		};
	} else if (action.type === TYPE.SET_CURRENT_CONTENT_RATIONALE_URL) {
		return {
			...state,
			currentContent: {
				...state.currentContent,
				rationale: {
					...state.currentContent?.rationale,
					url: action.payload,
				},
			},
		};
	} else if (action.type === TYPE.ADD_RATIONAL_IMAGE) {
		const index = action.payload;
		const array = [...state.currentContent?.rationale?.url];
		array.splice(index + 1, 0, "");
		return {
			...state,
			currentContent: {
				...state.currentContent,
				rationale: {
					...state.currentContent?.rationale,
					url: array,
				},
			},
		};
	} else if (action.type === TYPE.DELETE_RATIONAL_IMAGE) {
		const index = action.payload;
		const array = [...state.currentContent?.rationale?.url];
		array.splice(index, 1);
		return {
			...state,
			currentContent: {
				...state.currentContent,
				rationale: {
					...state.currentContent?.rationale,
					url: array,
				},
			},
		};
	} else {
		return state;
	}
}
