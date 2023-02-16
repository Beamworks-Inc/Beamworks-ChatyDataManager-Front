import { Content } from "../../../../interfaces/Content.interface";
import { Box, Divider, Grid } from "@mui/material";
import MainCard from "../../../../components/MainCard";
import { WriterInfo } from "./WriterInfo";
import { ReviewerInfo } from "./ReviewerInfo";

export function ContentsUserInfo(props: { content: Content }) {
	// @ts-ignore
	return (
		<Grid item xs={12} sm={3}>
			{/* @ts-ignore */}
			<MainCard
				sx={{ position: "relative" }}
				title={"생성자 / 검토자 정보 섹션"}
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
					<WriterInfo content={props.content} />
					<Divider />
					<ReviewerInfo content={props.content} />
				</Box>
			</MainCard>
		</Grid>
	);
}
