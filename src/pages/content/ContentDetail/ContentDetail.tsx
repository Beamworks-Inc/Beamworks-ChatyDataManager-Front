import React, {useState} from "react";

// material-ui
import {Grid,} from "@mui/material";

// project import
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "store";
import {ContentAction} from "store/reducers/ContentReducer";
import {IContent} from "interfaces/Content.interface";
import {ContentsUserInfo} from "./UserInfo/ContentsUserInfo";
import {ContentDetailEdit} from "./ContentDetailEdit/ContentDetailEdit";

// ==============================|| Content Detail Page ||============================== //

const ContentDetail = () => {
	const dispatch = useDispatch();

	const content = useSelector(
		(state: RootState) => state.ContentReducer.currentContent
	) as IContent;

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



	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	// @ts-ignore
	return (
		<Grid container rowSpacing={4.5} columnSpacing={2.75}>
			<ContentDetailEdit content={content}/>
			<ContentsUserInfo content={content} onClick={() => console.log(content)}/>
		</Grid>
	);
};

export default ContentDetail;
