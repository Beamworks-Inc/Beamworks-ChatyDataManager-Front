import { ListItemText } from "@mui/material";

export function LabelComponent(props: { label: number }) {
	return (
		<ListItemText
			sx={{
				backgroundColor: "#efefef",
				width: "1.5rem",
				height: "1.5rem",
				borderRadius: "50%",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
			primary={props.label}
		/>
	);
}
