import React from "react";
import { Box, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { ContentAction } from "store/reducers/ContentReducer";

export function UnselectBox() {
	const dispatch = useDispatch();

	const handleDeselectAllBtnClick = () => {
		dispatch(ContentAction.setSelectedCategoryList([]));
	};

	return (
		<Box
			sx={{
				marginTop: "1rem",
				marginBottom: "1rem",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Button onClick={handleDeselectAllBtnClick}>deselect all</Button>
		</Box>
	);
}
