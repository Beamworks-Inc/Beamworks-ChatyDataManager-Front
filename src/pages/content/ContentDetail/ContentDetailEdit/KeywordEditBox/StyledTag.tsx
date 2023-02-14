import { styled } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { AutocompleteGetTagProps } from "@mui/material";

interface TagProps extends ReturnType<AutocompleteGetTagProps> {
	label: string;
}

export function Tag(props: TagProps) {
	const { label, onDelete, ...other } = props;
	return (
		<div {...other}>
			<span>{label}</span>
			<CloseIcon onClick={onDelete} />
		</div>
	);
}

export const StyledTag = styled(Tag)<TagProps>(
	({ theme }) => `
	display: flex;
	align-items: center;
	height: 24px;
	margin: 2px;
	line-height: 22px;
	background-color: ${
		theme.palette.mode === "dark" ? "rgba(255,255,255,0.08)" : "#e0e0e0"
	};
	border: 1px solid ${theme.palette.mode === "dark" ? "#303030" : "#e8e8e8"};
	border-radius: 2px;
	box-sizing: content-box;
	padding: 0 4px 0 10px;
	outline: 0;
	overflow: hidden;
  
	&:focus {
	  border-color: ${theme.palette.mode === "dark" ? "#177ddc" : "#40a9ff"};
	  background-color: ${theme.palette.mode === "dark" ? "#003b57" : "#e6f7ff"};
	}
  
	& span {
	  overflow: hidden;
	  white-space: nowrap;
	  text-overflow: ellipsis;
	}
  
	& svg {
	  font-size: 12px;
	  cursor: pointer;
	  padding: 4px;
	}
  `
);
