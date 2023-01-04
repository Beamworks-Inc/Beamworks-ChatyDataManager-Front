// type & interfaces
import {
	ContentReducerState,
	Content,
	Treeitem,
} from "interfaces/Content.interface";

// state
const INIT_CONTENT_STATE: ContentReducerState = {
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
): ContentReducerState {
	switch (action.type) {
		case TYPE.SET_CONTENT_LIST_STATE:
			return { ...state, contentListState: action.payload };
		case TYPE.SET_MENU_ITEMS_STATE:
			return { ...state, menuItems: action.payload };
		default:
			return state;
	}
}

// dummy
// const after = [
// 	{
// 		id: 1,
// 		question: "코피가 나고 있을땐 어떻게 하나요?",
// 		answer:
// 			"가장먼저, 코피가 나고 있는지 확인해야합니다. 코피가 나고 있으면 코피를 물로 씻어주세요.",
// 		reference: "준응급교본",
// 		referenceLink: "https://www.dbpia.co.kr",
// 		rationale: "코피사진",
// 		rationaleLink:
// 			"https://blog.kakaocdn.net/dn/b0bEe7/btrFVv1atKF/K3TEq3U4gL7TbfppkWFJu0/img.png",
// 		writer: "cherryme",
// 		writeDate: "2022-12-21",
// 		reviewer: "Santa Claus",
// 		reviewDate: "2022-12-25",
// 	},
// 	{
// 		id: 2,
// 		question: "코피가 날때 코를 풀어도 괜찮은가요?",
// 		answer:
// 			"코피가 나고 있는 상태에서 코를 풀어도 괜찮습니다. 왜냐하면 코피가 나고 있는 상태에서 코를 풀면 코피가 더 잘 나오기 때문입니다.",
// 		reference: "준응급교본",
// 		referenceLink: "https://www.dbpia.co.kr",
// 		rationale: "코피사진",
// 		rationaleLink:
// 			"https://blog.kakaocdn.net/dn/b0bEe7/btrFVv1atKF/K3TEq3U4gL7TbfppkWFJu0/img.png",
// 		writer: "cherryme",
// 		writeDate: "2022-12-22",
// 		reviewer: "Santa Claus",
// 		reviewDate: "2022-12-25",
// 	},
// ];
