import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ContentCreateBtn = () => {
	const navigate = useNavigate();

	const handleBtnClick = () => {
		navigate("/content/create");
	};

	return (
		<Box>
			<Typography>키워드가 없습니다.</Typography>
			<Button onClick={handleBtnClick} variant="contained">
				키워드 만들기
			</Button>
		</Box>
	);
};

export default ContentCreateBtn;
