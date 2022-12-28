// material-ui
import { Box, Grid, Typography } from "@mui/material";

// project import
import MainCard from "components/MainCard";

import { useNavigate, useParams } from "react-router-dom";

// ==============================|| Content List Page ||============================== //

const ContentList = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item xs={12} sm={9}>
        <MainCard title="Content Create" content={false}>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            <Box
              sx={{
                height: 550,
                flexGrow: 1,
                maxWidth: 400,
                overflowY: "auto",
              }}
            >
              {/* Content Create Section */}
            </Box>
          </Typography>
        </MainCard>
      </Grid>
      <Grid item xs={12} sm={3}>
        <MainCard
          sx={{ position: "relative" }}
          title={"Reviewer Section"}
          content={false}
        >
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            <Box sx={{ height: 550, width: "100%" }}>
              {/* Reviewer Section */}
            </Box>
          </Typography>
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default ContentList;
