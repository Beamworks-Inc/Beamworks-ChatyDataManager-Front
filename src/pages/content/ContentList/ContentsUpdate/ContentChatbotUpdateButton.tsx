import React from "react";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Snackbar,
} from "@mui/material";
import ContentsAPI from "../../../../apis/content";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";

const DIALOG_TEXT =
	"검증된 모든 컨텐츠가 챗봇에 업데이트 되며, 한 번 업데이트된 컨텐츠는 되돌릴 수 없습니다. 업데이트 하시겠습니까? (최종적으로 컨텐츠를 챗봇에 적용하기 위해선, 개발자의 승인이 필요합니다. lee01042000@gmail.com 으로 문의바랍니다.)";
const SNACKBAR_TEXT = "컨텐츠를 업데이트 중입니다...";

function ContentsUploadDialog(props: {
	open: boolean;
	onClose: () => void;
	onClick: () => void;
}) {
	return (
		<Dialog open={props.open} onClose={props.onClose}>
			<DialogTitle> 검증된 컨텐츠 업로드 </DialogTitle>
			<DialogContent>
				<DialogContentText>{DIALOG_TEXT}</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={props.onClick}> 확인 </Button>
				<Button onClick={props.onClose}> 취소 </Button>
			</DialogActions>
		</Dialog>
	);
}

const ContentUpdateButton = () => {
	const [open, setOpen] = React.useState(false);
	const [snackbarOpen, setSnackbarOpen] = React.useState(false);
	const user = useSelector((state: RootState) => state.UserReducer);
	function setUpdateButtonClick() {
		setOpen(true);
	}
	function onDialogOkButtonClick() {
		setSnackbarOpen(true);
		setOpen(false);
		ContentsAPI.updateApprovedContentsToChatBot()
			.then((res) => {
				alert("업데이트 성공");
			})
			.catch((err) => {
				alert("업데이트 실패");
			})
			.finally(() => {
				setSnackbarOpen(false);
			});
	}
	return (
		<>
			{user.role === "REVIEWER" ? (
				<>
					<Button
						onClick={setUpdateButtonClick}
						sx={{ marginLeft: 1 }}
						variant="contained"
						color="secondary"
					>
						{" "}
						Update{" "}
					</Button>
					<ContentsUploadDialog
						open={open}
						onClose={() => setOpen(false)}
						onClick={onDialogOkButtonClick}
					/>
					<Snackbar open={snackbarOpen} message={SNACKBAR_TEXT} />
				</>
			) : (
				<></>
			)}
		</>
	);
};

export default ContentUpdateButton;
