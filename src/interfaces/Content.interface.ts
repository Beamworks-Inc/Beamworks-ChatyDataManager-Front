export interface IReference {
	title: string;
	description: string;
	link: URL | string;
}
export interface IFolder {
	name: string;
	children?: IFolder[];
}
export interface IRationaleDescription {
	description: string;
	link: URL | string;
}
export interface IRationale {
	file: URL[] | string[];
	description: IRationaleDescription[];
}
export interface IUser {
	name: string;
}
export interface IContent {
	id: string;
	folder: IFolder;
	question: string;
	answer: string;
	reference: IReference[];
	rationale: IRationale;
	writeDate: Date;
	writer: IUser;
	reviewer: IUser;
	reviewDate: Date;
	reviewComment: string;
	keywords: string[];
}
export interface IContentState {
	currentContent: IContent;
	contentListState: IContent[];
}
