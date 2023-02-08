import React from "react";
import { Content } from "../../../../interfaces/Content.interface";
import { Box, Tooltip, Typography } from "@mui/material";
import EditableText from "../../../../components/EditableText";

export function AnswerEditText(props: {
	content: Content;
	handleTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
	return (
		<Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
			<Typography variant="h4" sx={{}}>
				<Tooltip
					title="챗봇이 제공하는 응답을 의미합니다."
					placement="top"
					arrow
				>
					<span>Answer</span>
				</Tooltip>
			</Typography>
			<EditableText
				limit={250}
				text={props.content.answer}
				handleTextChange={props.handleTextChange}
				label="answer"
			/>
		</Box>
	);
}
