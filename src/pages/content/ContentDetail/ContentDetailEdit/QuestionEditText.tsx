import React from "react";
import { Content } from "../../../../interfaces/Content.interface";
import { Box, Tooltip, Typography } from "@mui/material";
import EditableText from "../../../../components/EditableText";

export function QuestionEditText(props: {
	content: Content;
	handleTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
	return (
		<Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
			<Typography variant="h4" sx={{}}>
				<Tooltip title="사용자의 발화를 의미합니다." placement="top" arrow>
					<span>Question</span>
				</Tooltip>
			</Typography>
			<EditableText
				limit={250}
				text={props.content.question}
				handleTextChange={props.handleTextChange}
				label="question"
			/>
		</Box>
	);
}
