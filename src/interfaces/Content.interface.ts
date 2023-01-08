import ContentsAPI from "../apis/content";

ContentsAPI.findByContentId("1")
	.then((response) => {
		console.log(response);
	})
	.catch((error) => {
		alert(error)
	})


export interface Reference {
	title: string;
	description: string;
	link: URL;
}
export interface Folder {
	name: string;
	children: Folder[];
}
export interface RationaleDescription {
	description: string;
	link: URL;
}
export interface Rationale {
	file: URL[];
	description: RationaleDescription[];
}
export interface User {
	name: string;
}
export interface Review {
	reviewer: User;
	reviewDate: Date;
	reviewComment: string;
}
type ContentState = "draft" | "review" | "approved" | "rejected";
export interface Content {
	id: string | null;
	folder: Folder;
	question: string;
	answer: string;
	reference: Reference[];
	rationale: Rationale;
	writeDate: Date;
	writer: User;
	keywords: string[];
	review: Review | null;
	state: ContentState;
}
export interface ContentReducerState {
	contentListState: Content[];
	menuItems: Treeitem;
}
export interface Treeitem {
	name: string;
	isEditMode: boolean;
	children: Treeitem[];
}
export interface ContentForGrid {
	id: string;
	question: string;
	answer: string;
	reference: string;
	referenceLink: string;
	rationale: string;
	rationaleLink: string;
	writer: string;
	writeDate: string;
	reviewer: string;
	reviewDate: string;
}
