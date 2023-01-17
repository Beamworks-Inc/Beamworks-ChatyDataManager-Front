import { TreeView } from "@mui/lab";
import React, { useEffect, CSSProperties } from "react";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import KeywordTreeItems from "./KeywordTreeItems";

// icons
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { RootState } from "store";
import ContentCreateBtn from "./ContentCreateBtn";
import ContentsAPI from "apis/content";
import { AxiosError, AxiosResponse } from "axios";
import { ContentAction } from "store/reducers/ContentReducer";

const boxStyle = {
	height: 550,
	flexGrow: 1,
	maxWidth: 400,
	overflowY: "auto",
} as CSSProperties;

export default function LevelOneTreeView() {
	const dispatch = useDispatch();
	const keywordCategories = useSelector(
		(state: RootState) => state.ContentReducer.keywordCategories
	);
	const user = useSelector((state: RootState) => state.UserReducer);
	const [expanded, setExpanded] = React.useState([] as string[]);
	const [selected, setSelected] = React.useState([] as string[]);

	const handleSelect = (event: React.SyntheticEvent, nodeIds: any) => {
		setSelected(nodeIds);
	};

	const handleToggle = (event: React.SyntheticEvent, nodeIds: string[]) => {
		setExpanded(nodeIds);
	};

	useEffect(() => {
		if (user.role === "CREATOR") {
			ContentsAPI.findAllKeywordList()
				.then((res: AxiosResponse) => {
					dispatch(ContentAction.setKeywordCategories(res.data));
				})
				.catch((err: AxiosError) => {
					alert(`findAllKeywordList error, code:(${err})`);
				});
		} else if (user.rold === "REVIEWER") {
			ContentsAPI.findAllReviewerKeywordList()
				.then((res: AxiosResponse) => {
					dispatch(ContentAction.setKeywordCategories(res.data));
				})
				.catch((err: AxiosError) => {
					alert(`findAllReviewerKeywordList error, code:(${err})`);
				});
		}
	}, []);

	return (
		<Box sx={boxStyle}>
			<TreeView
				aria-label="controlled"
				defaultCollapseIcon={<ExpandMoreIcon />}
				defaultExpandIcon={<ChevronRightIcon />}
				expanded={expanded}
				selected={selected}
				onNodeToggle={handleToggle}
				onNodeSelect={handleSelect}
				// multiSelect
			>
				{keywordCategories.length > 0 ? (
					<KeywordTreeItems items={keywordCategories} />
				) : (
					<ContentCreateBtn />
				)}
			</TreeView>
		</Box>
	);
}
