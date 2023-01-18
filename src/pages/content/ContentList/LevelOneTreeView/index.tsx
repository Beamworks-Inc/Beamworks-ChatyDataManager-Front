import React, { useEffect, CSSProperties } from "react";
import { Box, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

// icons
import { RootState } from "store";
import ContentsAPI from "apis/content";
import { AxiosError, AxiosResponse } from "axios";
import { ContentAction } from "store/reducers/ContentReducer";
import { KeywordDto } from "interfaces/Content.interface";
import { LabelComponent } from "./LabelComponent";
import { UnselectBox } from "./UnselectBox";

const boxStyle = {
	height: 550,
	flexGrow: 1,
	maxWidth: 400,
	overflowY: "auto",
} as CSSProperties;

function KeywordSelectView(props: { keyword: KeywordDto }) {
	const dispatch = useDispatch();
	const selectedKeyword = useSelector(
		(state: RootState) => state.ContentReducer.selectedCategoryList
	) as KeywordDto[];
	function onClick() {
		// if selected, remove from selectedKeyword and dispatch
		if (selectedKeyword.includes(props.keyword)) {
			const newSelectedKeyword = selectedKeyword.filter(
				(keyword) => keyword.name !== props.keyword.name
			);
			dispatch(ContentAction.setSelectedCategoryList(newSelectedKeyword));
		}
		// if not selected, add to selectedKeyword and dispatch
		else {
			const newSelectedKeyword = [...selectedKeyword, props.keyword];
			dispatch(ContentAction.setSelectedCategoryList(newSelectedKeyword));
		}
	}
	return (
		<ListItem
			secondaryAction={<LabelComponent label={props.keyword.count} />}
			selected={selectedKeyword.includes(props.keyword)}
		>
			<ListItemButton onClick={onClick}>
				<ListItemText primary={props.keyword.name} />
			</ListItemButton>
		</ListItem>
	);
}

export default function LevelOneTreeView() {
	const dispatch = useDispatch();
	const keywordCategories = useSelector(
		(state: RootState) => state.ContentReducer.keywordCategories
	);
	const user = useSelector((state: RootState) => state.UserReducer);

	useEffect(() => {
		if (user.role === "USER") {
			ContentsAPI.findAllKeywordList()
				.then((res: AxiosResponse) => {
					dispatch(ContentAction.setKeywordCategories(res.data));
				})
				.catch((err: AxiosError) => {
					alert(`findAllKeywordList error, code:(${err})`);
				});
		} else if (user.role === "REVIEWER") {
			ContentsAPI.findAllReviewerKeywordList()
				.then((res: AxiosResponse) => {
					dispatch(ContentAction.setKeywordCategories(res.data));
				})
				.catch((err: AxiosError) => {
					alert(`findAllReviewerKeywordList error, code:(${err})`);
				});
		} else {
			throw new Error("Invalid user role");
		}
	}, []);

	return (
		<Box sx={boxStyle}>
			<UnselectBox />
			{keywordCategories.map((keyword: KeywordDto) => (
				<KeywordSelectView keyword={keyword} />
			))}
		</Box>
	);
}
