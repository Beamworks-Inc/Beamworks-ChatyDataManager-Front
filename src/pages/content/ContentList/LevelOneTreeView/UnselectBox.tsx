import React from "react";
import { Box, Button, Input, InputAdornment } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ContentAction } from "store/reducers/ContentReducer";

import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { RootState } from "store";

export function UnselectBox() {
	const dispatch = useDispatch();

	const handleDeselectAllBtnClick = () => {
		dispatch(ContentAction.setSelectedCategoryList([]));
	};

	const keywordSearchValue = useSelector(
		(state: RootState) => state.ContentReducer.searchKeyword
	);

	const handleClickClearBtn = () => {
		dispatch(ContentAction.setSearchKeyword(""));
	};

	return (
		<Box
			sx={{
				marginTop: "1rem",
				marginBottom: "1rem",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Button onClick={handleDeselectAllBtnClick}>deselect all</Button>
			<Input
				value={keywordSearchValue}
				onChange={(e) =>
					dispatch(ContentAction.setSearchKeyword(e.target.value as string))
				}
				id="input-with-icon-adornment"
				placeholder="keyword search"
				startAdornment={
					<InputAdornment position="start">
						<SearchIcon />
					</InputAdornment>
				}
				endAdornment={
					<InputAdornment
						onClick={handleClickClearBtn}
						sx={{ cursor: "pointer" }}
						position="end"
					>
						<ClearIcon />
					</InputAdornment>
				}
			/>
		</Box>
	);
}
