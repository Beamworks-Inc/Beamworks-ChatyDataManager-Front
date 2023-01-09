import React, { useState } from "react";

// material-ui
import { Grid } from "@mui/material";

// project import
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { ContentAction } from "store/reducers/ContentReducer";
import { Content } from "interfaces/Content.interface";
import { ContentsUserInfo } from "./UserInfo/ContentsUserInfo";
import { ContentDetailEdit } from "./ContentDetailEdit/ContentDetailEdit";

// ==============================|| Content Detail Page ||============================== //

const ContentDetail = () => {

	const content = useSelector(
		(state: RootState) => state.ContentReducer.currentContent
	) as Content;

	// @ts-ignore
	return (
		<Grid container rowSpacing={4.5} columnSpacing={2.75}>
			<ContentDetailEdit content={content} />
			<ContentsUserInfo
				content={content}
				onClick={() => console.log(content)}
			/>
		</Grid>
	);
};

export default ContentDetail;
