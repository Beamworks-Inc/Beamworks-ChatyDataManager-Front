import { styled, useAutocomplete } from "@mui/material";
import { CSSProperties } from "react";

const AutoCompleteSelectBox = ({ text, handleTextChange, options }: any) => {
	const {
		getRootProps,
		getInputProps,
		getListboxProps,
		getOptionProps,
		groupedOptions,
	} = useAutocomplete({
		defaultValue: text,
		onInputChange: handleTextChange,
		freeSolo: true,
		id: "auto-complete-select-box",
		options: options,
	});

	const inputStyle = {
		padding: "0.5rem 0.5rem",
		borderRadius: "0.25rem",
		border: "0px",
		width: "10rem",
		backgroundColor: "#e0e0e0",
	} as CSSProperties;

	const Listbox = styled("ul")(({ theme }) => ({
		backgroundColor: "#fff",
		width: "10rem",
		margin: 0,
		padding: 0,
		zIndex: 1,
		position: "absolute",
		listStyle: "none",
		overflow: "auto",
		maxHeight: 200,
		border: "1px solid rgba(0,0,0,.25)",
		"& li.Mui-focused": {
			backgroundColor: theme.palette.grey[200],
			color: "black",
			cursor: "pointer",
		},
		"& li:active": {
			backgroundColor: theme.palette.grey[400],
			color: "black",
		},
	}));

	return (
		<div>
			<div {...getRootProps()}>
				<input
					placeholder="select / add keyword.."
					style={inputStyle}
					{...getInputProps()}
				/>
			</div>

			{groupedOptions.length > 0 ? (
				<Listbox {...getListboxProps()}>
					<div>
						{(groupedOptions as string[]).map((option, index) => (
							<li key={index + option} {...getOptionProps({ option, index })}>
								{option}
							</li>
						))}
					</div>
				</Listbox>
			) : null}
		</div>
	);
};

export default AutoCompleteSelectBox;
