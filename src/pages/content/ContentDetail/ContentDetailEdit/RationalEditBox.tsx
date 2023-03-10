import { Content } from "../../../../interfaces/Content.interface";
import { Box, Typography } from "@mui/material";
import CustomImageList from "../../../../components/CustomImageList";
import RationaleDescDatagrid from "../../../../components/RationaleDescDatagrid";
import React from "react";
import { ContentAction } from "../../../../store/reducers/ContentReducer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store";

export function RationalEditBox(props: { content: Content }) {

	const {content} = props;
	const dispatch = useDispatch();

	const handleImageListChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(
			ContentAction.setCurrentContent({
				...content,
				rationale: {
					...content.rationale,
					url: [...content.rationale.url].map((url, idx) => {
						if (`file${idx}` === e.currentTarget.id) {
							return e.currentTarget.value;
						} else {
							return url;
						}
					}),
				},
			})
		);
	};

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				gap: 1,
				height: "700px",
			}}
		>
			<Typography variant="h4" sx={{}}>
				Rationale
			</Typography>
			<CustomImageList
				files={content.rationale.url}
				onImageListChange={handleImageListChange}
			/>
			<RationaleDescDatagrid />
		</Box>
	);
}
