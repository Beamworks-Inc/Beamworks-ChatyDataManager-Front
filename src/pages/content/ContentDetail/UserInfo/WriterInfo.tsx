import { Content } from "../../../../interfaces/Content.interface";
import { Box, Typography } from "@mui/material";

export function WriterInfo(props: { content: Content }) {
	return (
		<>
			{/* Reviewer Section */}
			{props.content.writer && (
				<>
					<Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
						<Typography variant="h4" sx={{}}>
							Writer
						</Typography>
						<Typography variant="body1" sx={{}}>
							{props.content.writer.name || "Not created yet"}
						</Typography>
					</Box>

					<Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
						<Typography variant="h4" sx={{}}>
							Write Date
						</Typography>
						<Typography variant="body1" sx={{}}>
							{props.content.writeDate?.toLocaleDateString() ||
								"Not created yet"}
						</Typography>
					</Box>
				</>
			)}
		</>
	);
}
