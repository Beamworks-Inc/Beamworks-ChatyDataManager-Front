import React from "react";
import Img from "components/Img";
import { ImageList, ImageListItem, TextField } from "@mui/material";

const CustomImageList = ({ files, onImageListChange }: any) => {
	return (
		<ImageList sx={{ width: "100%" }} cols={3} rowHeight={300}>
			{files.map((file: string, idx: number) => (
				<>
					<ImageListItem
						sx={{
							width: "100%",
							aspectRatio: "1 / 1",
							border: "1px solid #e0e0e0",
							borderRadius: "5px",
							marginBottom: "3rem",
							position: "relative",
							padding: "0.5rem",
						}}
					>
						<Img src={file.toString()} />
						<TextField
							sx={{
								position: "absolute",
								bottom: "-3rem",
								left: "0",
								width: "100%",
							}}
							onChange={onImageListChange} // QUESTION: 배열 전체를 인덱스를 이용하여 state를 관리하는게 맞는가 싶다.
							id={`file${idx}`}
							placeholder="link here..."
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
