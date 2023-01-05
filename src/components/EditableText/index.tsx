import { TextField, Typography } from "@mui/material";

import React from "react";

const EditableText = ({
	text = "",
	handleTextChange,
	label: id,
	...props
}: any) => {
	const [isEditing, setIsEditing] = React.useState(false);

	const handleDoubleClick = (e: React.MouseEvent) => {
		setIsEditing(true);
	};

	const handleBlur = (e: React.FocusEvent) => {
		setIsEditing(false);
	};

	return (
		<Typography variant="body1">
			{isEditing ? (
				<TextField
					id={id}
					fullWidth
					multiline
					autoFocus
					value={text}
					onBlur={handleBlur}
					onChange={handleTextChange}
					placeholder="Enter content.."
				/>
			) : (
				<div
					style={{ whiteSpace: "pre-wrap" }}
					onDoubleClick={handleDoubleClick}
				>
					{text || "double click here.."}
				</div>
			)}
		</Typography>
	);
};

export default EditableText;
