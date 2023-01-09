export interface Reference {
	title: string;
	description: string;
	link: URL | string;
}
export interface Folder {
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
	name: string;
}
export interface Content {
	id: string;
	folder: Folder;
	question: string;
	answer: string;
	reference: Reference[];
	rationale: Rationale;
	writeDate: Date | null;
	writer: User;
	reviewer: User;
	reviewDate: Date | null;
	reviewComment: string;
	keywords: string[];
}
export interface ContentState {
	currentContent: Content;
	contentListState: Content[];
}
