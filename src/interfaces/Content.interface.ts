import {Role} from "../apis/Auth";

type NoNullFields<I> = { [K in keyof I]: NonNullable<I[K]> };
export interface Reference {
	id: number;
	title: string;
	description: string;
	link: URL | string;
}
export interface Folder {
	id: number | null;
	name: string;
	children?: Folder[];
}
export interface RationaleDescription {
	id: number | null;
	description: string;
	link: string;
}
export interface Rationale {
	id: number | null;
	description: RationaleDescription[];
	url: string[];
}
export interface User {
	id: number;
	name: string;
	email: string;
	role: Role |null;
}
export interface Review {
	id: number;
	reviewer: User;
	reviewDate: Date;
	reviewComment: string;
}
export type ContentStatus = "DRAFT" | "REVIEW" | "APPROVED" | "REJECTED";
export interface Content {
	id: string | null;
	folderId: number | null;
	question: string;
	answer: string;
	reference: Reference[];
	rationale: Rationale | null;
	writeDate: string | null;
	writer: User | null;
	keyword: string[];
	review: Review | null;
	status: ContentStatus | null;
}
export interface ContentReducerState {
	currentContent: Content | null;
	contentListState: Content[];
	menuItems: Treeitem | null;
}
export interface Treeitem {
	id: number;
	parentId: number;
	name: string;
	isEditMode: boolean;
	isCategory: boolean;
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
