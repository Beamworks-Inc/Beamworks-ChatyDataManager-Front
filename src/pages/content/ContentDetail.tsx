// material-ui
import { Box, Chip, Grid, Typography } from "@mui/material";

// project import
import MainCard from "components/MainCard";
import SimpleTable from "components/SimpleTable";
import { IContent } from "interfaces/Content.interface";
import { useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

// ==============================|| Content List Page ||============================== //

const ContentList = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [content, setContent] = useState<IContent>({
    id: "1",
    folder: { name: "응급처치" },
    question: "코피가 날때 코를 풀어도 괜찮은가요?",
    answer:
      "코피가 나고 있는 상태에서 코를 풀어도 괜찮습니다. 왜냐하면 코피가 나고 있는 상태에서 코를 풀면 코피가 더 잘 나오기 때문입니다.",
    reference: [
      {
        title: "코피응급처치",
        description: "의료 유튜버임",
        link: new URL("https://www.youtube.com"),
      },
      {
        title: "코피에 대한 논문",
        description: "2008년에 발표된 논문이며, IF 40 이상",
        link: new URL("https://www.dbpia.com"),
      },
    ],
    rationale: {
      file: [
        new URL(
          "https://blog.kakaocdn.net/dn/b0bEe7/btrFVv1atKF/K3TEq3U4gL7TbfppkWFJu0/img.png"
        ),
      ],
      description: [
        {
          description:
            "코피가 나고 있는 상태에서 코를 풀면 코피가 더 잘 나오기 때문입니다.",
          link: new URL("https://www.dbpia.co.kr"),
        },
      ],
    },
    writer: { name: "cherryme" },
    writeDate: new Date("2022-12-24"),
    reviewer: { name: "Santa Claus" },
    reviewDate: new Date("2022-12-25"),
    reviewComment: "좋은 내용입니다.",
    keywords: ["코피", "응급"],
  });

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item xs={12} sm={9}>
        <MainCard title="Content Detail" content={false}>
          <Box
            sx={{
              height: 550,
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              gap: 3,
              // maxWidth: 400,
              overflowY: "auto",
              padding: 3,
            }}
          >
            {/* Content Create Section */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Typography variant="h4" sx={{}}>
                Question
              </Typography>
              <Typography variant="body1" sx={{}}>
                {content.question}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Typography variant="h4" sx={{}}>
                Answer
              </Typography>
              <Typography variant="body1" sx={{}}>
                {content.answer}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Typography variant="h4" sx={{}}>
                Keywords
              </Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                {content.keywords?.map((keyword) => (
                  <Chip label={keyword} />
                ))}
              </Box>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Typography variant="h4" sx={{}}>
                Reference
              </Typography>
              <SimpleTable rows={content.reference} />
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Typography variant="h4" sx={{}}>
                Rationale
              </Typography>
            </Box>
          </Box>
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
