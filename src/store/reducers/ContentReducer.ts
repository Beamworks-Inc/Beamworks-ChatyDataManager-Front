// type & interfaces
import {
	ContentReducerState,
	Content,
	Folder,
	Treeitem,
} from "interfaces/Content.interface";

// state
const INIT_CONTENT_STATE: any = {
	menuItems: {
		name: "준응급",
		isEditMode: false,
		children: [
			{
				name: "코피",
				isEditMode: false,
				children: [
					{
						name: "응급1",
						isEditMode: true,
						children: [],
					},
					{
						name: "예방1",
						isEditMode: false,
						children: [],
					},
				],
			},
			{
				name: "찰과상",
				isEditMode: false,
				children: [
					{
						name: "응급2",
						isEditMode: false,
						children: [],
					},
					{
						name: "예방2",
						isEditMode: false,
						children: [],
					},
				],
			},
		],
	},
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
			review: {
				reviewer: { name: "init" },
				reviewDate: new Date(),
				reviewComment: "init",
			},
			keywords: ["init"],
			state: "draft",
		},
	],
};

// action type
const HEADER = "ContentReducer";
const TYPE = {
	SET_CONTENT_LIST_STATE: `${HEADER}/SET_CONTENT_LIST_STATE` as const,
	GET_MENU_ITEMS_STATE: `${HEADER}/GET_MENU_ITEMS_STATE` as const,
	SET_MENU_ITEMS_STATE: `${HEADER}/SET_MENU_ITEMS_STATE` as const,
};

// action creator
export const ContentAction = {
	setContentList: (contentList: Content[]) => ({
		type: TYPE.SET_CONTENT_LIST_STATE,
		payload: contentList,
	}),
	setMenuItems: (menuItems: Treeitem) => ({
		type: TYPE.SET_MENU_ITEMS_STATE,
		payload: menuItems,
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
		case TYPE.SET_MENU_ITEMS_STATE:
			return { ...state, menuItems: action.payload };
		default:
			return state;
	}
}
