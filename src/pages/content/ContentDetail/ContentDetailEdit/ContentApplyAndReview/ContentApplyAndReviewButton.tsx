import { Box, Button } from "@mui/material";
import { ReviewDialog } from "./ReviewDialog";
import React, { useState } from "react";
import ContentsAPI from "../../../../../apis/content";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../store";
import { Content } from "../../../../../interfaces/Content.interface";
import { useParams } from "react-router-dom";
import {Role} from "../../../../../apis/Auth";

export function ContentApplyAndReviewButton() {
	const [open, setOpen] = useState(false);
	const { folderId, contentId } = useParams();
	const content = useSelector(
		(state: RootState) => state.ContentReducer.currentContent
	) as Content;

	const userRole = useSelector((state:RootState)=> state.ContentReducer.role) as Role

	function handleOpen() {
		setOpen(true);
	}

	function handleClose() {
		setOpen(false);
	}

	function applyContentDetail() {
		if (typeof folderId !== "string") {
			alert("folderId가 잘못되었습니다.");
			return;
		}

		if (contentId === "create") {
			const newContent = JSON.parse(JSON.stringify(content));
			newContent.folderId = folderId;
			newContent.writer = { id: 1 }; // content.writer = {} // get writer from local storage
			newContent.writeDate = new Date().toISOString();
			ContentsAPI.create(newContent)
				.then((response) => {
					alert("컨텐츠가 정상적으로 생성 되었습니다.");
					// TOMORROW: response.data 에서 id 를 가져와서 해당 id로 reload
				})
				.catch((error) => {
					alert("컨텐츠 생성에 실패했습니다.");
				});
		} else {
			ContentsAPI.update(content)
				.then((response) => {
					alert("컨텐츠가 정상적으로 업데이트 되었습니다.");
				})
				.catch((error) => {
					alert("컨텐츠 업데이트에 실패했습니다.");
				});
		}
	}

	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "flex-end",
				position: "absolute",
				top: 12,
				right: 12,
				gap: 1,
			}}
		>
			<Button
				variant="contained"
				color="secondary"
				onClick={applyContentDetail}
			>
				apply
			</Button>
			{contentId === "create" && userRole=="REVIEWER"? null : (
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
			)}
		</Box>
	);
}
