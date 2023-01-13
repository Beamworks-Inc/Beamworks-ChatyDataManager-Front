import { useDispatch } from "react-redux";
import { ContentAction } from "store/reducers/ContentReducer";

// icons
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Folder, Treeitem } from "interfaces/Content.interface";
import React from "react";
import FoldersAPI from "apis/folder";
import { AxiosError, AxiosResponse, ResponseType } from "axios";
import { fromFolderToTreeitem } from "./util";

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
	if (root.id === item.id) {
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
		let nodeName = prompt("Enter name..");
		if (nodeName === null) return; // 취소 버튼 눌렀을때
		if (nodeName === "") nodeName = "new content"; // 아무것도 입력없이 확인 눌렀을때
		// root = appendTreeNode(root, item, nodeName);
		FoldersAPI.addChild(item.id, nodeName)
			.then((response: AxiosResponse) => {
				const folder = response.data;
				const updatedTreeitem = fromFolderToTreeitem(folder, folder.id);
				dispatch(ContentAction.setMenuItems(updatedTreeitem));
			})
			.catch((error: AxiosError) => {
				alert(`add error, code: (${error.code})`);
			});
	};

	const handleRemoveButtonClick = (event: React.MouseEvent) => {
		event.stopPropagation();
		const answer = confirm("delete it?");
		if (!answer) return;
		FoldersAPI.delete(item.id)
			.then((response: AxiosResponse<Folder>) => {
				const folder = response.data || null;
				const updatedTreeitem =
					folder !== null ? fromFolderToTreeitem(folder, folder.id) : null;
				dispatch(ContentAction.setMenuItems(updatedTreeitem));
			})
			.catch((error: AxiosError) => {
				alert(`remove error, code: (${error})`);
			});
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
			<EditIcon
				sx={{ "&:hover": { color: "black" }, cursor: "pointer" }}
				onClick={handleEditButtonClick}
				fontSize="small"
			/>
			<AddIcon
				sx={{ "&:hover": { color: "black" }, cursor: "pointer" }}
				onClick={handleAddButtonClick}
				fontSize="small"
			/>
			<RemoveIcon
				sx={{ "&:hover": { color: "black" }, cursor: "pointer" }}
				onClick={handleRemoveButtonClick}
				fontSize="small"
			/>
		</div>
	);
};

export default NormalModeComponent;
