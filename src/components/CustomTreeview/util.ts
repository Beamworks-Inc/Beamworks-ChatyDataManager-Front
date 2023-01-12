import { Folder, Treeitem } from "interfaces/Content.interface";

export const fromFolderToTreeitem = (
	root: Folder,
	parentId: number | null | undefined
) => {
	const newRoot = {
		...root,
		isEditMode: false,
		isCategory: false,
		parentId: parentId,
	} as Treeitem;
	if (newRoot.children.length > 0) {
		newRoot.isCategory = true;
		newRoot.children = newRoot.children.map((child) => {
			return fromFolderToTreeitem(child, newRoot.id);
		});
	}
	return newRoot;
};
