import {IContent} from "../../../../interfaces/Content.interface";
import {Box, Typography} from "@mui/material";
import CustomImageList from "../../../../components/CustomImageList";
import RationaleDescDatagrid from "../../../../components/RationaleDescDatagrid";

export function RationalEditBox(props: { content: IContent, onImageListChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
    return <Box
        sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            height: "700px",
        }}
    >
        <Typography variant="h4" sx={{}}>
            Rationale
        </Typography>
        <CustomImageList
            files={props.content.rationale.file}
            onImageListChange={props.onImageListChange}
        />
        <RationaleDescDatagrid/>
    </Box>;
}