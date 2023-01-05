import { TextField, Typography } from "@mui/material";

import React from "react";
// TODO: 컴포넌트 유형에 따라 줄바꿈 문자 안되게 하기
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
		<>
			{isEditing ? (
				<TextField
					inputProps={{
						style: {
							margin: "-14px",
						},
					}}
					fullWidth
					id={id}
					multiline
					autoFocus
					value={text}
					onFocus={(e) =>
						e.currentTarget.setSelectionRange(
							e.currentTarget.value.length,
							e.currentTarget.value.length
						)
					}
					onBlur={handleBlur}
					onChange={handleTextChange}
					placeholder="Enter content.."
				/>
			) : (
				<div
					style={{ whiteSpace: "pre-wrap" }}
					onDoubleClick={handleDoubleClick}
					{...props}
				>
					{text || "double click here.."}
				</div>
			)}
		</>
	);
};

export default EditableText;
