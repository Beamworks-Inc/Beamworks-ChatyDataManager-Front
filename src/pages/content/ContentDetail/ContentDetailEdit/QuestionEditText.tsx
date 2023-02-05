import React from "react";
import { Content } from "../../../../interfaces/Content.interface";
import { Box, Typography } from "@mui/material";
import EditableText from "../../../../components/EditableText";

export function QuestionEditText(props: {
	content: Content;
	handleTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
	return (
		<Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
			<Typography variant="h4" sx={{}}>
				Question
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
