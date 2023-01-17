import EditableText from "components/EditableText";
import React from "react";

const divStyle = {
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	padding: "0.25rem 0.5rem",
	borderRadius: "0.25rem",
	backgroundColor: "#e0e0e0",
	whiteSpace: "pre-wrap",
	// width: "fit-content", // TODO: 컨텐츠 크기에 맞게 늘어나게 하기
} as React.CSSProperties;

// TODO: 삭제도 만들기
const EditableChip = ({
	text = "",
	handleTextChange,
	label: id,
	...props
}: any) => {
	return (
		<div style={divStyle}>
			<EditableText
				text={text}
				handleTextChange={handleTextChange}
				label={id}
				{...props}
			/>
		</div>
	);
};

export default EditableChip;
