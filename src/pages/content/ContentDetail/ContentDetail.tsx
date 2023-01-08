import {useState} from "react";

// material-ui
import {Box, Grid,} from "@mui/material";

// project import
import MainCard from "components/MainCard";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "store";
import {ContentAction} from "store/reducers/ContentReducer";
import EditableChip from "components/EditableChip";
import {IContent} from "interfaces/Content.interface";
import {ContentApplyAndReviewButton} from "./ContentDetailEdit/ContentApplyAndReview/ContentApplyAndReviewButton";
import {ReviewDialog} from "./ContentDetailEdit/ContentApplyAndReview/ReviewDialog";
import {QuestionEditText} from "./ContentDetailEdit/QuestionEditText";
import {AnswerEditText} from "./ContentDetailEdit/AnswerEditText";
import {RationalEditBox} from "./ContentDetailEdit/RationalEditBox";
import {ReferenceEditBox} from "./ContentDetailEdit/ReferenceEditBox";
import {ContentsUserInfo} from "./UserInfo/ContentsUserInfo";
import {KeywordEditBox} from "./ContentDetailEdit/KeywordEditBox";

// ==============================|| Content Detail Page ||============================== //

const ContentDetail = () => {
	const dispatch = useDispatch();

	const content = useSelector(
		(state: RootState) => state.ContentReducer.currentContent
	) as IContent;

	const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const inputLabel = e.currentTarget.id;
		dispatch(
			ContentAction.setCurrentContent({
				...content,
				[inputLabel]: e.currentTarget.value,
			})
		);
	};

	const handleTextChangeForChip = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(
			ContentAction.setCurrentContent({
				...content,
				keywords: [...content.keywords].map((keyword, idx) => {
					if (`keyword${idx}` === e.currentTarget.id) {
						return e.currentTarget.value;
					} else {
						return keyword;
					}
				}),
			})
		);
	};

	const handleClickPlusButton = () => {
		const newKeyword = prompt("키워드를 입력해주세요.");
		if (newKeyword)
			dispatch(
				ContentAction.setCurrentContent({
					...content,
					keywords: [...content.keywords, newKeyword],
				})
			);
	};

	const handleImageListChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(
			ContentAction.setCurrentContent({
				...content,
				rationale: {
					...content.rationale,
					file: [...content.rationale.file].map((file, idx) => {
						if (`file${idx}` === e.currentTarget.id) {
							return e.currentTarget.value;
						} else {
							return file;
						}
					}),
				},
			})
		);
	};

	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	// @ts-ignore
	return (
		<Grid container rowSpacing={4.5} columnSpacing={2.75}>
			<Grid item xs={12} sm={9}>
				<MainCard
					sx={{position: "relative"}}
					title="Content Detail"
					content={false}
				>
					<ContentApplyAndReviewButton onClick={() => alert("업데이트 되었습니다.")} onClick1={handleOpen}/>
					<ReviewDialog open={open} handleOpen={handleOpen} handleClose={handleClose}/>

					<Box
						sx={{
							// height: 550,
							display: "flex",
							flexDirection: "column",
							flexGrow: 1,
							gap: 3,
							overflowY: "auto",
							padding: 3,
						}}
					>
						<QuestionEditText content={content} handleTextChange={handleTextChange}/>
						<AnswerEditText content={content} handleTextChange={handleTextChange}/>
						<KeywordEditBox content={content} onClick={handleClickPlusButton}/>
						<ReferenceEditBox/>
						<RationalEditBox content={content} onImageListChange={handleImageListChange}/>
					</Box>
				</MainCard>
			</Grid>
			<ContentsUserInfo content={content} onClick={() => console.log(content)}/>
		</Grid>
	);
};

export default ContentDetail;
