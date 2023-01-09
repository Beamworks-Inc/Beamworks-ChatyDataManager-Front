import TransitionsModal from "../../../../../components/Modal";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../store";
import {Content, ContentStatus} from "../../../../../interfaces/Content.interface";
import React from "react";
import { ContentAction } from "../../../../../store/reducers/ContentReducer";
import ContentsAPI from "../../../../../apis/content";

export function ReviewDialog(props: {
	open: boolean;
	handleOpen: () => void;
	handleClose: () => void;
}) {
	const dispatch = useDispatch();
	const content = useSelector(
		(state: RootState) => state.ContentReducer.currentContent
	) as Content;

	const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const inputLabel = e.currentTarget.id;
		dispatch(
			ContentAction.setCurrentContent({
				...content,
				[inputLabel]: e.currentTarget.value,
			})
		);
	};

	function updateReview() {
		ContentsAPI.update(content)
			.then((response) => {
				alert("리뷰가 성공적으로 업데이트 되었습니다.");
			})
			.catch(() => {
				alert("리뷰 업데이트에 실패했습니다.");
			})
			.finally(() => {
				props.handleClose();
			});
	}

	function setReviewState(newStatus : ContentStatus) {
		dispatch(
			ContentAction.setCurrentContent({
				...content,
				status : newStatus
			})
		)
	}

	function rejectReview() {
		setReviewState("REJECTED")
		updateReview();
	}
	function approveReview() {
		setReviewState("APPROVED")
		updateReview();
	}
	return (
		<TransitionsModal
			open={props.open}
			handleOpen={props.handleOpen}
			handleClose={props.handleClose}
		>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					gap: 1,
				}}
			>
				<Typography variant="h4" sx={{}}>
					Review
				</Typography>
				{/* text input */}
				<TextField
					fullWidth
					id="standard-multiline-static"
					label="review comment"
					multiline
					rows={4}
					variant="standard"
					placeholder="comments here..."
					onChange={handleTextChange}
				/>
				{/* buttons */}
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						gap: 1,
						mt: 2,
					}}
				>
					<Box sx={{ display: "flex", gap: 1 }}>
						<Button color="primary" variant="contained" onClick={approveReview}>
							Approve
						</Button>
						<Button color="error" variant="contained" onClick={rejectReview}>
							Reject
						</Button>
					</Box>
					<Button
						color="secondary"
						variant="contained"
						onClick={props.handleClose}
					>
						Close
					</Button>
				</Box>
			</Box>
		</TransitionsModal>
	);
}
