import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// material-ui
import {
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  ImageList,
  ImageListItem,
  TextField,
  Typography,
} from "@mui/material";
import Img from "components/Img";

// project import
import MainCard from "components/MainCard";
import TransitionsModal from "components/Modal";
import SimpleTable from "components/SimpleTable";
import { Content } from "interfaces/Content.interface";

// ==============================|| Content List Page ||============================== //

const ContentList = () => {
  const navigate = useNavigate();

  const [content, setContent] = useState<Content>({
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
        new URL(
          "https://www.k-health.com/news/photo/202105/53654_52347_211.png"
        ),
        new URL(
          "https://t2.daumcdn.net/thumb/R720x0/?fname=http://t1.daumcdn.net/brunch/service/user/2fG8/image/zH0wg75_SQHSt9bibZF3b3UOsN4.jpg"
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

  const handleDoubleClick = (e) => {
    e.target.contentEditable = true;
    e.target.focus();
  };

  const handleBlur = (e) => {
    e.target.contentEditable = false;
  };

  const handleClickPlusButton = () => {
    const newKeyword = prompt("키워드를 입력해주세요.");
    if (newKeyword) {
      setContent({
        ...content,
        keywords: [...content.keywords, newKeyword],
      });
    }
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item xs={12} sm={9}>
        <MainCard
          sx={{ position: "relative" }}
          title="Content Detail"
          content={false}
        >
          <Box
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
              onClick={() => alert("업데이트 되었습니다.")}
            >
              apply
            </Button>
            <Button variant="contained" color="secondary" onClick={handleOpen}>
              review
            </Button>
          </Box>

          {/* Modal For Review Content */}
          <TransitionsModal
            open={open}
            handleOpen={handleOpen}
            handleClose={handleClose}
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
                <Box sx={{ display: "flex", gap: 1 }}>
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
                  onClick={handleClose}
                >
                  Close
                </Button>
              </Box>
            </Box>
          </TransitionsModal>

          <Box
            sx={{
              // height: 550,
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              gap: 3,
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
                <p onBlur={handleBlur} onDoubleClick={handleDoubleClick}>
                  {content.question}
                </p>
              </Typography>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Typography variant="h4" sx={{}}>
                Answer
              </Typography>
              <Typography
                onBlur={handleBlur}
                onDoubleClick={handleDoubleClick}
                variant="body1"
                sx={{}}
              >
                {content.answer}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Typography variant="h4" sx={{}}>
                Keywords
              </Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                {content.keywords?.map((keyword, idx: number) => {
                  return (
                    <>
                      <Chip
                        onBlur={handleBlur}
                        onDoubleClick={handleDoubleClick}
                        label={keyword}
                      />
                      {idx === content.keywords.length - 1 && (
                        <Chip label="+" onClick={handleClickPlusButton} />
                      )}
                    </>
                  );
                })}
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
              <ImageList sx={{ width: "100%" }} cols={3} rowHeight={300}>
                {content.rationale.file.map((file: URL) => (
                  <ImageListItem
                    sx={{
                      border: "3px solid #efefef",
                      borderRadius: "10px",
                      padding: "1rem",
                    }}
                    key={file.toString()}
                  >
                    <Img src={file.toString()} alt={"image"} />
                  </ImageListItem>
                ))}
              </ImageList>
              <SimpleTable rows={content.rationale.description} />
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
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              gap: 3,
              overflowY: "auto",
              padding: 3,
            }}
          >
            {/* Reviewer Section */}
            {content.writer && (
              <>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <Typography variant="h4" sx={{}}>
                    Writer
                  </Typography>
                  <Typography variant="body1" sx={{}}>
                    {content.writer.name}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <Typography variant="h4" sx={{}}>
                    Write Date
                  </Typography>
                  <Typography variant="body1" sx={{}}>
                    {content.writeDate.toLocaleDateString()}
                  </Typography>
                </Box>
              </>
            )}
            <Divider />
            {content.reviewer && (
              <>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <Typography variant="h4" sx={{}}>
                    Reviewer
                  </Typography>
                  <Typography variant="body1" sx={{}}>
                    {content.reviewer.name}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <Typography variant="h4" sx={{}}>
                    Review Date
                  </Typography>
                  <Typography variant="body1" sx={{}}>
                    {content.reviewDate.toLocaleDateString()}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <Typography variant="h4" sx={{}}>
                    Review Comment
                  </Typography>
                  <Typography variant="body1" sx={{}}>
                    {content.reviewComment}
                  </Typography>
                </Box>
              </>
            )}
          </Box>
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default ContentList;
