import {IContent} from "../../../../interfaces/Content.interface";
import {Box, Typography} from "@mui/material";
import EditableText from "../../../../components/EditableText";

export function AnswerEditText(props: { content: IContent, handleTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
    return <Box sx={{display: "flex", flexDirection: "column", gap: 1}}>
        <Typography variant="h4" sx={{}}>
            Answer
        </Typography>
        <EditableText
            text={props.content.answer}
            handleTextChange={props.handleTextChange}
            label="answer"
        />
    </Box>;
}