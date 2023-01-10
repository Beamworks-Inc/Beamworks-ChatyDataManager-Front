import React, {useEffect, useState} from "react";

// material-ui
import {CircularProgress, Grid} from "@mui/material";

// project import
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { ContentAction } from "store/reducers/ContentReducer";
import { Content } from "interfaces/Content.interface";
import { ContentsUserInfo } from "./UserInfo/ContentsUserInfo";
import { ContentDetailEdit } from "./ContentDetailEdit/ContentDetailEdit";
import {useParams} from "react-router-dom";
import ProgressView from "./ProgressView";
import ContentsAPI from "../../../apis/content";

// ==============================|| Content Detail Page ||============================== //

const ContentDetail = () => {

	const {folderName, contentId }=useParams()

	const [isLoadingComplete,setLoadingState]=useState(false)

	useEffect(()=>{
		if (typeof contentId === "string") {
			const id=parseInt(contentId)
			if(isNaN(id)){
				alert(`잘못된 contentId 입니다. content Id : ${contentId}`)
			}
			ContentsAPI.findByContentId(id)
				.then((response)=> {
					ContentAction.setCurrentContent(response.data)
					console.log(response.data)
					setLoadingState(true)
				})
				.catch((error)=>{
					alert(`컨텐츠를 로드하는데 실패했습니다. contentId : ${contentId}, error : ${error}`)
					console.log(error)
				})
		}
	},[])

	const content = useSelector(
		(state: RootState) => state.ContentReducer.currentContent
	) as Content;
	console.log(isLoadingComplete,content)
	// @ts-ignore
	return (
		<Grid container rowSpacing={4.5} columnSpacing={2.75}>
			{
				isLoadingComplete?
					<ContentDetailEdit content={content} />
					: <ProgressView/>
			}
			{
				isLoadingComplete?
					<ContentsUserInfo
						content={content}
						onClick={() => console.log(content)}
					/>
					: <div/>
			}
		</Grid>
	);
};

export default ContentDetail;
