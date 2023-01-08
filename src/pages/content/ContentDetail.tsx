import { useState } from "react";

// material-ui
import {
	Box,
	Button,
	Divider,
	Grid,
	ImageList,
	ImageListItem,
	TextField,
	Typography,
} from "@mui/material";

// project import
import MainCard from "components/MainCard";
import TransitionsModal from "components/Modal";
import EditableText from "components/EditableText";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { ContentAction } from "store/reducers/ContentReducer";
import EditableChip from "components/EditableChip";
import ReferenceDatagrid from "components/ReferenceDatagrid";
import RationaleDescDatagrid from "components/RationaleDescDatagrid";
import CustomImageList from "components/CustomImageList";
import { IContent } from "interfaces/Content.interface";

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

	return (
		<Grid container rowSpacing={4.5} columnSpacing={2.75}>
			<Grid item xs={12} sm={9}>
				<MainCard
					sx={{ position: "relative" }}
					title="Content Detail"
					content={false}
				>
					<Box
						sx={{
							display: "flex",
							justifyContent: "flex-end",
							position: "absolute",
							top: 12,
							right: 12,
							gap: 1,
						}}
					>
						<Button
							variant="contained"
							color="secondary"
							onClick={() => alert("업데이트 되었습니다.")}
						>
							apply
						</Button>
						<Button variant="contained" color="secondary" onClick={handleOpen}>
							review
						</Button>
					</Box>

					{/* Modal For Review Content */}
					<TransitionsModal
						open={open}
						handleOpen={handleOpen}
						handleClose={handleClose}
					>
						<Box
							sx={{
								display: "flex",
								flexDirection: "column",
								gap: 1,
							}}
						>
							<Typography variant="h4" sx={{}}>
								Review
							</Typography>
							{/* text input */}
							<TextField
								fullWidth
								id="standard-multiline-static"
								label="review comment"
								multiline
								rows={4}
								variant="standard"
								placeholder="comments here..."
							/>
							{/* buttons */}
							<Box
								sx={{
									display: "flex",
									justifyContent: "space-between",
									gap: 1,
									mt: 2,
								}}
							>
								<Box sx={{ display: "flex", gap: 1 }}>
									<Button color="primary" variant="contained">
										Approve
									</Button>
									<Button color="error" variant="contained">
										Reject
									</Button>
								</Box>
								<Button
									color="secondary"
									variant="contained"
									onClick={handleClose}
								>
									Close
								</Button>
							</Box>
						</Box>
					</TransitionsModal>

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
						{/* Content Detail Section */}
						<Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
							<Typography variant="h4" sx={{}}>
								Question
							</Typography>
							<EditableText
								text={content.question}
								handleTextChange={handleTextChange}
								label="question"
							/>
						</Box>

						<Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
							<Typography variant="h4" sx={{}}>
								Answer
							</Typography>
							<EditableText
								text={content.answer}
								handleTextChange={handleTextChange}
								label="answer"
							/>
						</Box>

						<Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
							<Typography variant="h4" sx={{}}>
								Keywords
							</Typography>
							<Box sx={{ display: "flex", gap: 1 }}>
								{content.keywords?.map((keyword: string, idx: number) => {
									return (
										<EditableChip
											// key={idx}
											text={keyword}
											handleTextChange={handleTextChangeForChip}
											label={`keyword${idx}`}
										/>
									);
								})}
								<EditableChip
									text="add keyword.."
									onClick={handleClickPlusButton}
								/>
							</Box>
						</Box>

						<Box
							sx={{
								display: "flex",
								flexDirection: "column",
								gap: 1,
								height: "300px",
							}}
						>
							<Typography variant="h4" sx={{}}>
								Reference
							</Typography>
							<ReferenceDatagrid />
						</Box>

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
								files={content.rationale.file}
								onImageListChange={handleImageListChange}
							/>
							<RationaleDescDatagrid />
						</Box>
					</Box>
				</MainCard>
			</Grid>
			<Grid item xs={12} sm={3}>
				<MainCard
					sx={{ position: "relative" }}
					title={"Reviewer Section"}
					content={false}
				>
					<Box
						sx={{
							width: "100%",
							display: "flex",
							flexDirection: "column",
							flexGrow: 1,
							gap: 3,
							overflowY: "auto",
							padding: 3,
						}}
					>
						{/* Reviewer Section */}
						{content.writer && (
							<>
								<Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
									<Typography variant="h4" sx={{}}>
										Writer
									</Typography>
									<Typography variant="body1" sx={{}}>
										{content.writer.name}
									</Typography>
								</Box>

								<Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
									<Typography variant="h4" sx={{}}>
										Write Date
									</Typography>
									<Typography variant="body1" sx={{}}>
										{content.writeDate.toLocaleDateString()}
									</Typography>
								</Box>
							</>
						)}
						<Divider />
						{content.reviewer && (
							<>
								<Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
									<Typography variant="h4" sx={{}}>
										Reviewer
									</Typography>
									<Typography variant="body1" sx={{}}>
										{content.reviewer.name}
									</Typography>
								</Box>

								<Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
									<Typography variant="h4" sx={{}}>
										Review Date
									</Typography>
									<Typography variant="body1" sx={{}}>
										{content.reviewDate.toLocaleDateString()}
									</Typography>
								</Box>

								<Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
									<Typography variant="h4" sx={{}}>
										Review Comment
									</Typography>
									<Typography variant="body1" sx={{}}>
										{content.reviewComment}
									</Typography>
								</Box>
								<Button onClick={() => console.log(content)}>hello</Button>
							</>
						)}
					</Box>
				</MainCard>
			</Grid>
		</Grid>
	);
};

export default ContentDetail;
