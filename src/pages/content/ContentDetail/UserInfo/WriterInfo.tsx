import { Content } from "../../../../interfaces/Content.interface";
import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

export function WriterInfo(props: { content: Content }) {
	return (
		<>
			{/* Reviewer Section */}
			<Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
				<Typography variant="h4" sx={{}}>
					Writer
				</Typography>
				<Typography variant="body1" sx={{}}>
					{props.content?.writer?.name || "Not created yet"}
				</Typography>
			</Box>

			<Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
				<Typography variant="h4" sx={{}}>
					Write Date
				</Typography>
				<Typography variant="body1" sx={{}}>
					{Number.isNaN(
						Date.parse(props.content?.writeDate as unknown as string)
					)
						? "Not created yet"
						: new Date(
								props.content?.review?.reviewDate as unknown as string
						  ).toLocaleString()}
				</Typography>
			</Box>
		</>
	);
}
