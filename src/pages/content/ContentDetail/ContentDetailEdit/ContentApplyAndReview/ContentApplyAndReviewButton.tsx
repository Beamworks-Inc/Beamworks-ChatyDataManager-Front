import { Box, Button } from "@mui/material";
import { ReviewDialog } from "./ReviewDialog";
import { CSSProperties, useState } from "react";
import ContentsAPI from "apis/content";
import { useSelector } from "react-redux";
import { Content } from "interfaces/Content.interface";
import { RootState } from "store";
import { useNavigate, useParams } from "react-router-dom";
import { User } from "interfaces/Content.interface";

export function ContentApplyAndReviewButton() {
	const DEFAULT_FOLDERID = 390;

	// styles
	const boxStyle = {
		display: "flex",
		justifyContent: "flex-end",
		position: "absolute",
		top: 12,
		right: 12,
		gap: 1,
	} as CSSProperties;

	// hooks
	const [open, setOpen] = useState(false);
	const navigate = useNavigate();
	const { contentId } = useParams();

	// states
	const user = useSelector((state: RootState) => state.UserReducer) as User;
	const content = useSelector(
		(state: RootState) => state.ContentReducer.currentContent
	) as Content;

	// handlers
	function handleOpen() {
		setOpen(true);
	}

	function handleClose() {
		setOpen(false);
	}

	function handleApplyBtnClick() {
		const newContent = JSON.parse(JSON.stringify(content));
		newContent.writer = user;
		newContent.writeDate = new Date().toISOString();
		if (contentId === "create") {
			newContent.folderId = DEFAULT_FOLDERID; // TODO: 임시로 폴더 아이디를 390으로 설정
			ContentsAPI.create(newContent)
				.then(() => {
					alert("컨텐츠가 정상적으로 생성 되었습니다.");
					navigate(`/content`);
				})
				.catch((error) => {
					alert(`컨텐츠 생성에 실패했습니다. errror: ${error}`);
				});
		} else {
			ContentsAPI.update(newContent)
				.then(() => {
					alert("컨텐츠가 정상적으로 업데이트 되었습니다.");
				})
				.catch((error) => {
					alert(`컨텐츠 업데이트에 실패했습니다. errror: ${error}`);
				});
		}
	}

	return (
		<Box sx={boxStyle}>
			<Button
				variant="contained"
				color="secondary"
				onClick={handleApplyBtnClick}
			>
				apply
			</Button>
			{contentId !== "create" && user.role == "REVIEWER" ? (
				<>
					<Button variant="contained" color="secondary" onClick={handleOpen}>
						review
					</Button>
					<ReviewDialog
						open={open}
						handleOpen={handleOpen}
						handleClose={handleClose}
					/>
				</>
			) : null}
		</Box>
	);
}
