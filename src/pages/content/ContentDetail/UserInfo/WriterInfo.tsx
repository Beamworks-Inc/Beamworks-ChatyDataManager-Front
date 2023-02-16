import { Content } from "../../../../interfaces/Content.interface";
import { Box, Typography } from "@mui/material";

const CONST = {
	DEFAULT_CONTENT: "아직 생성되지 않았습니다.",
};

export function WriterInfo(props: { content: Content }) {
	return (
		<>
			<Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
				<Typography variant="h4" sx={{}}>
					Writer
				</Typography>
				<Typography variant="body1" sx={{}}>
					{props.content?.writer?.name || CONST.DEFAULT_CONTENT}
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
						? CONST.DEFAULT_CONTENT
						: new Date(
								props.content?.writeDate as unknown as string
						  ).toLocaleString()}
				</Typography>
			</Box>
		</>
	);
}
