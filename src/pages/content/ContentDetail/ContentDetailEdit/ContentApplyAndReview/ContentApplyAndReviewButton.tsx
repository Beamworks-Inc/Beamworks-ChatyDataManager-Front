import {Box, Button} from "@mui/material";

export function ContentApplyAndReviewButton(props: { onClick: () => void, onClick1: () => void }) {
    return <Box
        sx={{
            display: "flex",
            justifyContent: "flex-end",
            position: "absolute",
            top: 12,
            right: 12,
            gap: 1,
        }}
    >
        <Button
            variant="contained"
            color="secondary"
            onClick={props.onClick}
        >
            apply
        </Button>
        <Button variant="contained" color="secondary" onClick={props.onClick1}>
            review
        </Button>
    </Box>;
}