import { Box, Tooltip, Typography } from "@mui/material";
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
				<Tooltip
					title="해당 컨텐츠가 어떤 전문의 분과(ex, 영상의학과, 외과..)에 속하는지를 의미합니다."
					placement="top"
					arrow
				>
					<span>Reviewer Keyword</span>
				</Tooltip>
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
