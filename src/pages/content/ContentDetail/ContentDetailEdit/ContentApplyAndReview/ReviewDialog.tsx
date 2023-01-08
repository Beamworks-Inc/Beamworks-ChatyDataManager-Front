import TransitionsModal from "../../../../../components/Modal";
import {Box, Button, TextField, Typography} from "@mui/material";

export function ReviewDialog(props: { open: boolean, handleOpen: () => void, handleClose: () => void }) {
    return <TransitionsModal
        open={props.open}
        handleOpen={props.handleOpen}
        handleClose={props.handleClose}
    >
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
            }}
        >
            <Typography variant="h4" sx={{}}>
                Review
            </Typography>
            {/* text input */}
            <TextField
                fullWidth
                id="standard-multiline-static"
                label="review comment"
                multiline
                rows={4}
                variant="standard"
                placeholder="comments here..."
            />
            {/* buttons */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 1,
                    mt: 2,
                }}
            >
                <Box sx={{display: "flex", gap: 1}}>
                    <Button color="primary" variant="contained">
                        Approve
                    </Button>
                    <Button color="error" variant="contained">
                        Reject
                    </Button>
                </Box>
                <Button
                    color="secondary"
                    variant="contained"
                    onClick={props.handleClose}
                >
                    Close
                </Button>
            </Box>
        </Box>
    </TransitionsModal>;
}