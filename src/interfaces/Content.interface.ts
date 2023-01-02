export interface Reference {
  title: string;
  description: string;
  link: URL;
}
export interface Folder {
  name: string;
  children?: Folder[];
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
export interface Content {
  id: string;
  folder: Folder;
  question: string;
  answer: string;
  reference: Reference[];
  rationale: Rationale;
  writeDate: Date;
  writer: User;
  keywords: string[];
  review: Review;
}
export interface ContentState {
  contentListState: Content[];
}
