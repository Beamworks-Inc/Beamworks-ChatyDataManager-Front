import { Button } from "@mui/material";
import FoldersAPI from "apis/folder";
import { AxiosError, AxiosResponse } from "axios";
import { useDispatch } from "react-redux";
import { ContentAction } from "store/reducers/ContentReducer";
import { fromFolderToTreeitem } from "./util";

const FolderAddButton = () => {
	const dispatch = useDispatch();

	const handleClickAddFolder = () => {
		const folderName = prompt("enter folder name");
		if (!folderName) return;
		const newFolder = {
			id: null,
			name: folderName,
			children: [],
		};
		FoldersAPI.create(newFolder)
			.then((res: AxiosResponse) => {
				const folder = res.data;
				const updatedTreeitem = fromFolderToTreeitem(folder, folder.id);
				dispatch(ContentAction.setMenuItems(updatedTreeitem));
			})
			.catch((err: AxiosError) => {
				alert(`폴더 생성에 실패하였습니다. code:(${err.code})`);
			});
	};

	return (
		<div
			style={{
				width: "100%",
				display: "flex",
				justifyContent: "center",
				margin: "1rem 0",
			}}
		>
			<Button
				sx={{ width: "80%" }}
				variant="contained"
				onClick={handleClickAddFolder}
			>
				add folder
			</Button>
		</div>
	);
};

export default FolderAddButton;
