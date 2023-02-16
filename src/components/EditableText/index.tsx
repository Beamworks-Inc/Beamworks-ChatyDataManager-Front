import { TextField, Typography } from "@mui/material";

import React from "react";
// TODO: 컴포넌트 유형에 따라 줄바꿈 문자 안되게 하기

const CONST = {
	FIELD_PLACEHOLDER: "내용을 입력해주세요.",
	CLICK_TO_EDIT: "더블클릭하여 수정하세요.",
};

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
				<>
					<div style={{ position: "relative" }}>
						<TextField
							inputProps={{
								style: {
									margin: "-14px",
									paddingRight: "70px",
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
							placeholder={CONST.FIELD_PLACEHOLDER}
						/>
						{props.limit && (
							<Typography
								sx={{
									position: "absolute",
									right: 5,
									bottom: 0,
									color: "gray",
								}}
							>
								{text.length + " / " + props.limit}
							</Typography>
						)}
					</div>
				</>
			) : (
				<div
					style={{ whiteSpace: "pre-wrap" }}
					onDoubleClick={handleDoubleClick}
					{...props}
				>
					{text || CONST.CLICK_TO_EDIT}
				</div>
			)}
		</>
	);
};

export default EditableText;
