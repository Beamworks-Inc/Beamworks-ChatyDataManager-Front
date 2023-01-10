import React from "react";
import {CircularProgress, Grid, Typography} from "@mui/material";

const ProgressView=()=>{
    return(
        <Grid item xs={12} sm={9} padding={20}>
            <CircularProgress/>
            <Typography>
                Loading Contents...
            </Typography>
        </Grid>
    )
}

export default ProgressView