import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import FoldersAPI from "apis/folder";
import { AxiosError, AxiosResponse } from "axios";
import { Folder, Treeitem } from "interfaces/Content.interface";
import React from "react";
import { useDispatch } from "react-redux";
import { ContentAction } from "store/reducers/ContentReducer";
import { fromFolderToTreeitem } from "./util";

const updateTreeRoot = (root: Treeitem, item: Treeitem) => {
	if (root.id === item.id) {
		return item;
	} else {
		if (root.children) {
			root.children = root.children.map((child) => {
				return updateTreeRoot(child, item);
			});
		}
		return root;
	}
};

const EditModeComponent = ({ root, item }: any) => {
	const dispatch = useDispatch();
	const [value, setValue] = React.useState(item.name);

	const handleOnChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value);
	};

	const handleCheckIconClick = (event: React.MouseEvent) => {
		event.stopPropagation();
		if (!confirm("Are you sure to update this item?")) return;
		item.isEditMode = false;
		item.name = value;
		root = updateTreeRoot(root, item);
		FoldersAPI.update(root.id, root)
			.then((response: AxiosResponse) => {
				const treeitems = fromFolderToTreeitem(response.data, response.data.id);
				dispatch(ContentAction.setMenuItems(treeitems));
			})
			.catch((error: AxiosError) => {
				alert(`edit error, code: (${error.code})`);
			});
	};

	const handleCloseIconClick = (event: React.MouseEvent) => {
		event.stopPropagation();
		item.isEditMode = false;
		dispatch(ContentAction.setMenuItems({ ...root }));
	};

	return (
		<>
			<input
				style={{
					width: "60%",
					height: "20px",
					border: "0px",
					position: "absolute",
					top: "1px",
					left: "30px",
					zIndex: "1",
				}}
				value={value}
				onChange={handleOnChangeInput}
				type="text"
			/>
			<div
				style={{
					position: "absolute",
					right: "0px",
					top: "0px",
					zIndex: "2",
				}}
			>
				<CheckIcon
					sx={{ "&:hover": { color: "black" }, cursor: "pointer" }}
					onClick={handleCheckIconClick}
					fontSize="small"
				/>
				<CloseIcon
					sx={{ "&:hover": { color: "black" }, cursor: "pointer" }}
					onClick={handleCloseIconClick}
					fontSize="small"
				/>
			</div>
		</>
	);
};

export default EditModeComponent;
