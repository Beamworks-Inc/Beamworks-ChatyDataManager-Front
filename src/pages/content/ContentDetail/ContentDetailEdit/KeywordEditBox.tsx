import { Content } from "../../../../interfaces/Content.interface";
import { Box, Typography } from "@mui/material";
import EditableChip from "../../../../components/EditableChip";
import { ContentAction } from "../../../../store/reducers/ContentReducer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store";
import React from "react";

export function KeywordEditBox(props: { content: Content }) {

	const {content} = props;
	const keyword = useSelector((state: RootState) => state.ContentReducer.currentContent.keyword);

	const dispatch = useDispatch();

	const handleTextChangeForChip = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(
			ContentAction.setCurrentContent({
				...content,
				keyword: [...content.keyword].map((keyword, idx) => {
					if (`keyword${idx}` === e.currentTarget.id) {
						return e.currentTarget.value;
					} else {
						return keyword;
					}
				}),
			})
		);
	};

	const handleClickPlusButton = () => {
		const newKeyword = prompt("키워드를 입력해주세요.");
		if (newKeyword)
			dispatch(
				ContentAction.setCurrentContent({
					...content,
					keyword: [...content.keyword, newKeyword],
				})
			);
	};

	return (
		<Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
			<Typography variant="h4" sx={{}}>
				Keywords
			</Typography>
			<Box sx={{ display: "flex", gap: 1 }}>
				{content.keyword?.map((keyword: string, idx: number) => {
					return (
						<EditableChip
							// key={idx}
							text={keyword}
							handleTextChange={handleTextChangeForChip}
							label={`keyword${idx}`}
						/>
					);
				})}
				<EditableChip text="add keyword.." onClick={handleClickPlusButton} />
			</Box>
		</Box>
	);
}
