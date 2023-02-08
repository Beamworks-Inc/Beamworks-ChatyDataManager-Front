import PropTypes from "prop-types";

// material-ui
import { useTheme } from "@mui/material/styles";
import { Stack, Chip } from "@mui/material";

// project import
import DrawerHeaderStyled from "./DrawerHeaderStyled";
import Logo from "components/Logo";

// ==============================|| DRAWER HEADER ||============================== //

const DrawerHeader = ({ open }) => {
	const theme = useTheme();

	return (
		// only available in paid version
		<DrawerHeaderStyled theme={theme} open={open}>
			<Stack direction="row" spacing={1} alignItems="center">
				<Logo />
				<Chip
					style={{
						// translate to the left 1rem
						transform: "translateX(-1rem) translateY(0.2rem)",
					}}
					label={0.1}
					size="small"
					sx={{
						height: 16,
						"& .MuiChip-label": { fontSize: "0.625rem", py: 0.25 },
					}}
					component="a"
					href="https://beamworks.co.kr/"
					target="_blank"
					clickable
				/>
			</Stack>
		</DrawerHeaderStyled>
	);
};

DrawerHeader.propTypes = {
	open: PropTypes.bool,
};

export default DrawerHeader;
