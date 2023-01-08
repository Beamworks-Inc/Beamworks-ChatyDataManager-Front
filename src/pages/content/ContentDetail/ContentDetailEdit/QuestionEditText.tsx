import {IContent} from "../../../../interfaces/Content.interface";
import {Box, Typography} from "@mui/material";
import EditableText from "../../../../components/EditableText";

export function QuestionEditText(props: { content: IContent, handleTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
    return <Box sx={{display: "flex", flexDirection: "column", gap: 1}}>
        <Typography variant="h4" sx={{}}>
            Question
        </Typography>
        <EditableText
            text={props.content.question}
            handleTextChange={props.handleTextChange}
            label="question"
        />
    </Box>;
}