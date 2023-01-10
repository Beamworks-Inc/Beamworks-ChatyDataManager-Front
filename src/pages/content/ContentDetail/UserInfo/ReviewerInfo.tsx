import { Content } from "../../../../interfaces/Content.interface";
import { Box, Typography } from "@mui/material";

export function ReviewerInfo(props: { content: Content }) {
	return (
		<>
			<Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
				<Typography variant="h4" sx={{}}>
					Reviewer
				</Typography>
				<Typography variant="body1" sx={{}}>
					{props.content?.review?.reviewer?.name || "Not reviewed yet"}
				</Typography>
			</Box>

			<Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
				<Typography variant="h4" sx={{}}>
					Review Date
				</Typography>
				<Typography variant="body1" sx={{}}>
					{props.content?.review?.reviewDate || "Not reviewed yet"}
				</Typography>
			</Box>

			<Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
				<Typography variant="h4" sx={{}}>
					Review Comment
				</Typography>
				<Typography variant="body1" sx={{}}>
					{props.content?.review?.reviewComment || "Not reviewed yet"}
				</Typography>
			</Box>
		</>
	);
}
