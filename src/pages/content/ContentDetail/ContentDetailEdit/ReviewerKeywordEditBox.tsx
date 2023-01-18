import { Box, Typography } from "@mui/material";
import EditableChip from "components/EditableChip";
import { ContentAction } from "store/reducers/ContentReducer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import React from "react";

export function ReviewerKeywordEditBox() {
	const reviewerKeyword = useSelector(
		(state: RootState) => state.ContentReducer.currentContent.reviewerKeyword
	);

	const dispatch = useDispatch();

	const handleTextChangeForChip = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(ContentAction.setReviewerKeyword(e.currentTarget.value));
	};

	return (
		<Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
			<Typography variant="h4" sx={{}}>
				Reviewer Keyword
			</Typography>
			<Box sx={{ display: "flex", gap: 1 }}>
				<EditableChip
					text={reviewerKeyword}
					handleTextChange={handleTextChangeForChip}
				/>
			</Box>
		</Box>
	);
}
