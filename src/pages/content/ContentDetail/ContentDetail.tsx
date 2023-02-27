import { useEffect, useState } from "react";

// material-ui
import { Grid } from "@mui/material";

// project import
import { RootState } from "store";
import { ContentAction, initialContent } from "store/reducers/ContentReducer";
import { Content } from "interfaces/Content.interface";
import { ContentsUserInfo } from "./UserInfo/ContentsUserInfo";
import { ContentDetailEdit } from "./ContentDetailEdit/ContentDetailEdit";
import ProgressView from "./ProgressView";
import ContentsAPI from "apis/content";

// modules
import { AxiosError, AxiosResponse } from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// ==============================|| Content Detail Page ||============================== //

const defaultValueSetting = (content: Content) => {
	const newContent = Object.assign({}, content);
	if (
		newContent?.reference?.length === undefined ||
		newContent?.reference?.length === 0
	) {
		newContent.reference = [
			{
				title: "",
				description: "",
				link: "",
			},
		];
	}
	// pretend rationale has two options. if it is not null, description and url has full length
	if (newContent.rationale === null) {
		newContent.rationale = {
			id: null,
			description: [
				{
					id: null,
					description: "",
					link: "",
				},
			],
			url: [""],
		};
	}

	return newContent;
};

const ContentDetail = () => {
	const { contentId } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [isLoadingComplete, setLoadingState] = useState(false);

	useEffect(() => {
		if (typeof contentId === "string") {
			if (contentId === "create") {
				dispatch(ContentAction.setCurrentContent(initialContent));
				setLoadingState(true);
			} else {
				console.log("why here?", contentId);
				const id = parseInt(contentId);
				if (isNaN(id)) {
					alert(`잘못된 contentId 입니다. content Id : ${contentId}`);
				}
				ContentsAPI.findByContentId(id)
					.then((response: AxiosResponse) => {
						dispatch(
							ContentAction.setCurrentContent(
								defaultValueSetting(response.data)
							)
						);
						setLoadingState(true);
					})
					.catch((error: AxiosError) => {
						alert(
							`컨텐츠를 로드하는데 실패했습니다. contentId : ${contentId}, error : ${error}`
						);
						navigate(-1);
					});
			}
		}
	}, []);

	const content = useSelector(
		(state: RootState) => state.ContentReducer.currentContent
	) as Content;
	return (
		<Grid container rowSpacing={4.5} columnSpacing={2.75}>
			{isLoadingComplete ? (
				<>
					<ContentDetailEdit content={content} />
					<ContentsUserInfo content={content} />
				</>
			) : (
				<ProgressView />
			)}
		</Grid>
	);
};

export default ContentDetail;
