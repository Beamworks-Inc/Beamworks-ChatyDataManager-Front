import * as XLSX from "xlsx";
import * as fs from "fs"; /* load 'fs' for readFile and writeFile support */
// import { Readable } from "stream"; /* load 'stream' for stream support */
// import * as cpexcel from 'xlsx/dist/cpexcel.full.mjs'; /* load the codepage support library for extended support with older formats  */

import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogProps,
	DialogTitle,
	FormControl,
	FormControlLabel,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
	Switch,
} from "@mui/material";
import React, { BaseSyntheticEvent } from "react";

const ExcelUploadDialog = ({ open, handleClose }: any) => {
	XLSX.set_fs(fs);
	// XLSX.stream.set_readable(Readable);
	// XLSX.set_cptable(cpexcel);

	const [HTML, setHTML] = React.useState("");

	const handleApply = (e: BaseSyntheticEvent) => {
		// parse Excel Rows to json
		const wb = XLSX.read(HTML, { type: "string" });
		const ws = wb.Sheets[wb.SheetNames[0]];
		const json = XLSX.utils.sheet_to_json(ws, { header: 1 });
	};

	return (
		<Dialog fullWidth={true} maxWidth="lg" open={open} onClose={handleClose}>
			<DialogTitle>Excel Upload</DialogTitle>
			<DialogContent>
				<DialogContentText>
					You can upload excel data to content list.
				</DialogContentText>
				<Box
					noValidate
					component="form"
					sx={{
						display: "flex",
						flexDirection: "column",
						m: "1rem",
						width: "fit-content",
					}}
				>
					{/* File upload button here */}
					<input
						style={{ marginBottom: "1rem" }}
						type="file"
						onChange={async (e: React.ChangeEvent) => {
							/* get data as an ArrayBuffer */
							const file = e.target.files[0];
							const data = await file.arrayBuffer();

							/* parse and load first worksheet */
							const wb = XLSX.read(data);
							const ws = wb.Sheets[wb.SheetNames[0]];
							setHTML(XLSX.utils.sheet_to_html(ws, { id: "tabeller" }));
						}}
					/>
					<div dangerouslySetInnerHTML={{ __html: HTML }} />
				</Box>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleApply}>Apply</Button>
				<Button onClick={handleClose}>Close</Button>
			</DialogActions>
		</Dialog>
	);
};

export default ExcelUploadDialog;
