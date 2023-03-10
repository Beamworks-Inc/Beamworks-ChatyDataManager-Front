import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@mui/material";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ExcelUploadDialog from "./ExcelUpload.tsx/ExcelUploadButton";

const ContentCreateTypeDialogButton = () => {
	const navigate = useNavigate();

	const [excelUploadDialogOpen, setExcelUploadDialogOpen] = useState(false);
	const [contentCreateTypeDialogOpen, setContentCreateTypeDialogOpen] =
		useState(false);

	const handleCreateBtnClick = () => {
		setContentCreateTypeDialogOpen(true);
	};

	const handleOnHandBtnClick = () => {
		navigate(`/content/create`);
	};

	const handleExcelUploadBtnClick = () => {
		setExcelUploadDialogOpen(true);
	};

	const handleCloseBtnClick = () => {
		setContentCreateTypeDialogOpen(false);
	};

	return (
		<>
			<Button
				variant="contained"
				color="secondary"
				onClick={handleCreateBtnClick}
			>
				create
			</Button>

			<Dialog open={contentCreateTypeDialogOpen}>
				<DialogTitle>컨텐츠 종류 선택</DialogTitle>
				<DialogContent>
					<DialogContentText>컨텐츠 종류를 선택해주세요.</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleOnHandBtnClick}>On hand</Button>
					<Button onClick={handleExcelUploadBtnClick}>Excel Upload</Button>
					<Button onClick={handleCloseBtnClick}>Close</Button>
				</DialogActions>
			</Dialog>
			<ExcelUploadDialog
				open={excelUploadDialogOpen}
				handleClose={() => setExcelUploadDialogOpen(false)}
			/>
		</>
	);
};

export default ContentCreateTypeDialogButton;
