import { Box, Typography } from "@mui/material";
import { ContentAction } from "store/reducers/ContentReducer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import React, { useEffect } from "react";
import AutoCompleteSelectBox from "components/AutoCompleteSelectBox";
import ContentsAPI from "apis/content";
import { AxiosError, AxiosResponse } from "axios";
import { KeywordDto } from "interfaces/Content.interface";

function extractName(data: KeywordDto[]) {
	return data.map((keyword) => keyword.name);
}

export function ReviewerKeywordEditBox() {
	const reviewerKeyword = useSelector(
		(state: RootState) => state.ContentReducer.currentContent.reviewerKeyword
	);

	const dispatch = useDispatch();

	const handleTextChangeForChip = (
		e: React.ChangeEvent<HTMLInputElement>,
		value: string
	) => {
		dispatch(ContentAction.setReviewerKeyword(value));
	};

	const [reviewerKeywords, setReviewerKeywords] = React.useState<string[]>([]);

	useEffect(() => {
		ContentsAPI.findAllReviewerKeywordList()
			.then((res: AxiosResponse) => {
				const reviewerKeywordList = extractName(res.data);
				setReviewerKeywords(reviewerKeywordList);
			})
			.catch((err: AxiosError) => {
				alert(`findAllReviewerKeywordList error, code:(${err})`);
			});
	}, []);

	return (
		<Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
			<Typography variant="h4" sx={{}}>
				Reviewer Keyword
			</Typography>
			<Box sx={{ display: "flex", gap: 1 }}>
				<AutoCompleteSelectBox
					text={reviewerKeyword}
					options={reviewerKeywords}
					handleTextChange={handleTextChangeForChip}
				/>
			</Box>
		</Box>
	);
}
