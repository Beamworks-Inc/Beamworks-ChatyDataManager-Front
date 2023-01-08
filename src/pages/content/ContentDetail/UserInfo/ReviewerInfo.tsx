import {IContent} from "../../../../interfaces/Content.interface";
import {Box, Button, Typography} from "@mui/material";

export function ReviewerInfo(props: { content: IContent, onClick: () => void }) {
    return <>
        {props.content.reviewer && (
            <>
                <Box sx={{display: "flex", flexDirection: "column", gap: 1}}>
                    <Typography variant="h4" sx={{}}>
                        Reviewer
                    </Typography>
                    <Typography variant="body1" sx={{}}>
                        {props.content.reviewer.name || "Not reviewed yet"}
                    </Typography>
                </Box>

                <Box sx={{display: "flex", flexDirection: "column", gap: 1}}>
                    <Typography variant="h4" sx={{}}>
                        Review Date
                    </Typography>
                    <Typography variant="body1" sx={{}}>
                        {props.content.reviewDate?.toLocaleDateString() ||
                            "Not reviewed yet"}
                    </Typography>
                </Box>

                <Box sx={{display: "flex", flexDirection: "column", gap: 1}}>
                    <Typography variant="h4" sx={{}}>
                        Review Comment
                    </Typography>
                    <Typography variant="body1" sx={{}}>
                        {props.content.reviewComment || "Not reviewed yet"}
                    </Typography>
                </Box>
                <Button onClick={props.onClick}>
                    Check Reducer
                </Button>
            </>
        )}
    </>;
}