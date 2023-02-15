import { Box, Tooltip, Typography } from "@mui/material";
import ReferenceDatagrid from "../../../../components/ReferenceDatagrid";

export function ReferenceEditBox() {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				gap: 1,
				height: "auto",
			}}
		>
			<Typography variant="h4" sx={{}}>
				<Tooltip
					title="컨텐츠의 근거자료(논문 서치, 웹페이지 링크 등)를 의미합니다."
					placement="top"
					arrow
				>
					<span>Reference</span>
				</Tooltip>
			</Typography>
			<ReferenceDatagrid />
		</Box>
	);
}
