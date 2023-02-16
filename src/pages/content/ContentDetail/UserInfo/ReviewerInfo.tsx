import { Content } from "../../../../interfaces/Content.interface";
import { Box, Tooltip, Typography } from "@mui/material";

interface ReviewInfo {
	title: string;
	description: string;
	tooltip?: string;
}

const CONST = {
	DEFAULT_CONTENT: "아직 검토되지 않았습니다.",
};

const reviewInfo: (content: Content) => ReviewInfo[] = (content: Content) => [
	{
		title: "Reviewer",
		description: content?.review?.reviewer?.name || CONST.DEFAULT_CONTENT,
	},
	{
		title: "Review Date",
		description: Number.isNaN(
			Date.parse(content?.review?.reviewDate as unknown as string)
		)
			? CONST.DEFAULT_CONTENT
			: new Date(
					content?.review?.reviewDate as unknown as string
			  ).toLocaleString(),
	},
	{
		title: "Review Comment",
		description: content?.review?.reviewComment || CONST.DEFAULT_CONTENT,
	},
	{
		title: "Review Status",
		description: content?.status || CONST.DEFAULT_CONTENT,
		tooltip: "3가지 상태가 있습니다. DRAFT / APPROVED / REJECTED",
	},
];

function ReviewInfoItem(props: { info: ReviewInfo }) {
	return (
		<Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
			<Typography variant="h4" sx={{}}>
				<Tooltip title={props.info.tooltip} placement="top" arrow>
					<span>{props.info.title}</span>
				</Tooltip>
			</Typography>
			<Typography variant="body1" sx={{}}>
				{props.info.description}
			</Typography>
		</Box>
	);
}

export function ReviewerInfo(props: { content: Content }) {
	return (
		<>
			{reviewInfo(props.content).map((info: ReviewInfo, idx: number) => (
				<ReviewInfoItem key={idx} info={info} />
			))}
		</>
	);
}
