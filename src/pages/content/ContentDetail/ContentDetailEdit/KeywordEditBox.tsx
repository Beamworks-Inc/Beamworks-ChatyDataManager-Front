import { Content } from "../../../../interfaces/Content.interface";
import { Box, Tooltip, Typography } from "@mui/material";
import EditableChip from "../../../../components/EditableChip";
import { ContentAction } from "../../../../store/reducers/ContentReducer";
import { useDispatch, useSelector } from "react-redux";
import React from "react";

export function KeywordEditBox(props: { content: Content }) {
	const { content } = props;

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
				<Tooltip
					title="컨텐츠의 전체적인 주제, Question, Answer을 대표하는 키워드를 의미합니다."
					placement="top"
					arrow
				>
					<span>Keywords</span>
				</Tooltip>
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
				<EditableChip
					style={{ cursor: "pointer" }}
					text="add keyword.."
					onClick={handleClickPlusButton}
				/>
			</Box>
		</Box>
	);
}
