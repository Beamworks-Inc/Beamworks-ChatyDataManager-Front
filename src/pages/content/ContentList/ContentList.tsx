// material-ui
import { Box, Grid, Typography } from "@mui/material";

// project import
import MainCard from "components/MainCard";
import CustomDatagrid from "components/CustomDatagrid";

// interfaces

import LevelOneTreeView from "./LevelOneTreeView";
import ContentChatbotUpdateButton from "./ContentsUpdate/ContentChatbotUpdateButton";
import ContentCreateTypeDialogButton from "./ContentCreateTypeDialogButton";

// ==============================|| Content List Page ||============================== //

const ContentList = () => {
	return (
		<Grid container rowSpacing={4.5} columnSpacing={2.75}>
			<Grid item xs={12} sm={2}>
				{/*@ts-ignore*/}
				<MainCard title="Content Category" content={false}>
					<Typography variant="body2" sx={{ color: "text.secondary" }}>
						<Box
							sx={{
								height: 550,
								flexGrow: 1,
								maxWidth: 400,
								overflowY: "auto",
							}}
						>
							{/* tree view component here */}
							{/* <CustomTreeView /> */}
							<LevelOneTreeView />
						</Box>
					</Typography>
				</MainCard>
			</Grid>
			<Grid item xs={12} sm={10}>
				{/*@ts-ignore*/}
				<MainCard
					sx={{ position: "relative" }}
					title={"Content List"}
					content={false}
				>
					{/* position it at the top right */}
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
						<ContentCreateTypeDialogButton />
						<ContentChatbotUpdateButton />
					</Box>
					<Typography variant="body2" sx={{ color: "text.secondary" }}>
						<Box sx={{ height: 550, width: "100%" }}>
							<CustomDatagrid />
						</Box>
					</Typography>
				</MainCard>
			</Grid>
		</Grid>
	);
};

export default ContentList;
