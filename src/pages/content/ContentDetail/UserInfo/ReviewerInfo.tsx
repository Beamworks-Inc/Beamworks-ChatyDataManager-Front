import { Content } from "../../../../interfaces/Content.interface";
import { Box, Typography } from "@mui/material";

interface ReviewInfo{
	title : string,
	description: string
}

const reviewInfo: (content: Content)=>ReviewInfo[]=(content: Content)=>[
	{
		title: "Reviewer",
		description: content?.review?.reviewer?.name || "Not reviewed yet"
	},
	{
		title: "Review Date",
		description: new Date(content?.review?.reviewDate as unknown as string).toLocaleString() || "Not reviewed yet"
	},
	{
		title: "Review Comment",
		description: content?.review?.reviewComment || "Not reviewed yet"
	},
	{
		title: "Review Status",
		description: content?.status || "Not reviewed yet"
	}
]

function ReviewInfoItem(props: { info: ReviewInfo }) {
	return <Box sx={{display: "flex", flexDirection: "column", gap: 1}}>
		<Typography variant="h4" sx={{}}>
			{props.info.title}
		</Typography>
		<Typography variant="body1" sx={{}}>
			{props.info.description}
		</Typography>
	</Box>;
}

export function ReviewerInfo(props: { content: Content }) {
	return (
		<>
			{
				reviewInfo(props.content).map((info:ReviewInfo)=> <ReviewInfoItem info={info}/>)
			}
		</>
	);
}
