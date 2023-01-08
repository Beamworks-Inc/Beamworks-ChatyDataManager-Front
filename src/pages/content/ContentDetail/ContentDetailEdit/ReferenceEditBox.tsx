import {Box, Typography} from "@mui/material";
import ReferenceDatagrid from "../../../../components/ReferenceDatagrid";

export function ReferenceEditBox() {
    return <Box
        sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            height: "300px",
        }}
    >
        <Typography variant="h4" sx={{}}>
            Reference
        </Typography>
        <ReferenceDatagrid/>
    </Box>;
}