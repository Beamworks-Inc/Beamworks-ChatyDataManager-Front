import React, { CSSProperties } from "react";
import { Box, Button, styled } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useDispatch, useSelector } from "react-redux";
import { ContentAction } from "store/reducers/ContentReducer";

const imgStyle = {
	width: "100%",
	height: "100%",
	borderRadius: "10px",
	objectFit: "contain",
	padding: "auto",
};

const Overlay = styled("div")`
	&:hover img {
		filter: blur(5px);
	}
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	opacity: 1;
	transition: opacity 0.3s ease-in-out;
`;

const PlusBtnStyled = styled(Button)({
	width: "7rem",
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -150%)",
	cursor: "pointer",
});

const RemoveBtnStyled = styled(Button)({
	width: "7rem",
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, 50%)",
	cursor: "pointer",
});

const StyledDiv = styled(Box)({
	width: "100%",
	height: "100%",
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	alignItems: "center",
	boxSizing: "border-box",
	color: "red",
	fontWeight: "bolder",
});

export default function Img(props: { src: string; idx: number }) {
	const { src, idx } = props;

	const dispatch = useDispatch();

	const [valid, setValid] = React.useState(true);
	const [showIcons, setShowButtons] = React.useState(false);

	const handleMouseOver = (
		e: React.MouseEvent<HTMLImageElement, MouseEvent>
	) => {
		setShowButtons(true);
	};

	const handleMouseOut = (
		e: React.MouseEvent<HTMLImageElement, MouseEvent>
	) => {
		setShowButtons(false);
	};

	const handleAddIconClick = () => {
		dispatch(ContentAction.addRationaleImage(idx));
	};

	const handleRemoveIconClick = () => {
		dispatch(ContentAction.deleteRationaleImage(idx));
	};

	React.useEffect(() => {
		setValid(true);
	}, [src]);

	if (!valid) {
		return (
			<StyledDiv>
				<div>잘못된 링크 형식입니다</div>
				<div>'이미지'링크를 그대로 붙여넣어 주세요</div>
			</StyledDiv>
		);
	}

	return (
		<Overlay onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
			<img
				style={imgStyle as CSSProperties}
				onError={() => setValid(false)}
				src={src}
				alt={"No Valid Image Link\n"}
				loading="lazy"
			/>
			{showIcons && (
				<>
					<PlusBtnStyled
						onClick={handleAddIconClick}
						variant="contained"
						color="secondary"
						startIcon={<AddIcon />}
					>
						Add
					</PlusBtnStyled>
					<RemoveBtnStyled
						onClick={handleRemoveIconClick}
						variant="contained"
						disabled={idx === 0}
						color="error"
						startIcon={<RemoveIcon />}
					>
						Remove
					</RemoveBtnStyled>
				</>
			)}
		</Overlay>
	);
}
