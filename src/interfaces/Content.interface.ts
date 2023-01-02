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
type ContentState = "draft" | "review" | "approved" | "rejected";
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
  state : ContentState;
}
export interface IContentState {
  contentListState: Content[];
}
