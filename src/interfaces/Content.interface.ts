type NoNullFields<I> = { [K in keyof I]: NonNullable<I[K]> };
export interface Reference {
	title: string;
	description: string;
	link: URL | string;
}
export interface Folder {
	id: number;
	name: string;
	children?: Folder[];
}
export interface RationaleDescription {
	description: string;
	link: URL | string;
}
export interface Rationale {
	file: (URL | string)[];
	description: RationaleDescription[];
}
export interface User {
	id: string;
	name: string;
	email: string;
}
export interface Review {
	reviewer: User;
	reviewDate: Date;
	reviewComment: string;
}
type ContentStatus = "draft" | "review" | "approved" | "rejected";
export interface Content {
	id: string | null;
	folder: Folder | null;
	question: string;
	answer: string;
	reference: Reference[];
	rationale: Rationale | null;
	writeDate: Date | null;
	writer: User | null;
	keywords: string[];
	review: Review | null;
	status: ContentStatus | null;
}
export interface ContentReducerState {
	currentContent: Content;
	contentListState: Content[];
	menuItems: Treeitem;
}
export interface Treeitem {
	id: string;
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
