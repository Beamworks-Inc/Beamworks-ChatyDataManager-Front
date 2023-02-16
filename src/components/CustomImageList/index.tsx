import React from "react";
import Img from "components/Img";
import { ImageList, ImageListItem, TextField } from "@mui/material";

const CONST = {
	FIELD_PLACEHOLDER: "이미지링크를 입력햐주세요.",
};

const CustomImageList = ({ files, onImageListChange }: any) => {
	const textFieldStyle = {
		position: "absolute",
		bottom: "-3rem",
		left: "0",
		width: "100%",
	};
	const imageItemStyle = {
		width: "100%",
		aspectRatio: "1 / 1",
		border: "1px solid #e0e0e0",
		borderRadius: "5px",
		marginBottom: "3rem",
		position: "relative",
		padding: "0.5rem",
	};
	return (
		<ImageList sx={{ width: "100%" }} cols={3} rowHeight={300}>
			{files.map((file: string, idx: number) => (
				<>
					<ImageListItem sx={imageItemStyle}>
						<Img src={file.toString()} />
						<TextField
							sx={textFieldStyle}
							onChange={onImageListChange} // QUESTION: 배열 전체를 인덱스를 이용하여 state를 관리하는게 맞는가 싶다.
							id={`file${idx}`}
							placeholder={CONST.FIELD_PLACEHOLDER}
							variant="outlined"
							value={file.toString()}
						/>
					</ImageListItem>
				</>
			))}
		</ImageList>
	);
};

export default React.memo(CustomImageList);
