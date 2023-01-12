import { useDispatch } from "react-redux";
import { ContentAction } from "store/reducers/ContentReducer";

// icons
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Treeitem } from "interfaces/Content.interface";
import React from "react";
import axios from "axios";
import FoldersAPI from "apis/folder";

const editTreeNode = (root: Treeitem, item: Treeitem) => {
	if (root.id === item.id) {
		return item;
	} else {
		if (root.children.length > 0) {
			root.children = root.children.map((child) => {
				return editTreeNode(child, item);
			});
		}
		return root;
	}
};

const appendTreeNode = (root: Treeitem, item: Treeitem, nodeName: string) => {
	if (root.id === item.parentId) {
		root.children.push({
			id: null,
			parentId: root.id,
			name: nodeName,
			isEditMode: false,
			isCategory: false,
			children: [],
		} as any);
	} else {
		if (root.children.length > 0) {
			root.children = root.children.map((child) => {
				return appendTreeNode(child, item, nodeName);
			});
		}
	}
	return root;
};

const deleteTreeNode = (root: Treeitem, item: Treeitem) => {
	if (root.id === item.parentId) {
		root.children = root.children.filter((child) => child.id !== item.id);
	} else {
		if (root.children.length > 0) {
			root.children = root.children.map((child) => {
				return deleteTreeNode(child, item);
			});
		}
	}
	return root;
};

const NormalModeComponent = ({ root, item }: any) => {
	const dispatch = useDispatch();

	const handleEditButtonClick = (event: React.MouseEvent) => {
		event.stopPropagation();
		item.isEditMode = true;
		root = editTreeNode(root, item);
		dispatch(ContentAction.setMenuItems({ ...root }));
	};

	const handleAddButtonClick = (event: React.MouseEvent) => {
		event.stopPropagation();
		const nodeName = prompt("Enter name..") || "new node";
		root = appendTreeNode(root, item, nodeName);
		dispatch(ContentAction.setMenuItems({ ...root }));
		FoldersAPI.update(root.id, root);
	};

	const handleRemoveButtonClick = (event: React.MouseEvent) => {
		event.stopPropagation();
		const answer = confirm("delete it?");
		if (!answer) return;
		root = deleteTreeNode(root, item);
		dispatch(ContentAction.setMenuItems({ ...root }));
		FoldersAPI.update(root.id, root);
	};

	return (
		<div
			style={{
				position: "absolute",
				right: "0px",
				top: "0px",
				zIndex: "2",
			}}
		>
			<EditIcon onClick={handleEditButtonClick} fontSize="small" />
			<AddIcon onClick={handleAddButtonClick} fontSize="small" />
			<RemoveIcon onClick={handleRemoveButtonClick} fontSize="small" />
		</div>
	);
};

export default NormalModeComponent;
