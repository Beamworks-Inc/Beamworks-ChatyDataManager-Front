import * as XLSX from "xlsx";
import * as fs from "fs"; /* load 'fs' for readFile and writeFile support */
// import { Readable } from "stream"; /* load 'stream' for stream support */
// import * as cpexcel from 'xlsx/dist/cpexcel.full.mjs'; /* load the codepage support library for extended support with older formats  */

import {
	Box,
	Button,
	CircularProgress,
	CircularProgressProps,
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
	Snackbar,
	Switch,
	Typography,
} from "@mui/material";
import React, { BaseSyntheticEvent } from "react";
import excelHandler from "./ExcelContentHandler/ExcelContentsHandler";

function CircularProgressWithLabel(
	props: CircularProgressProps & { value: number }
) {
	return (
		<Box sx={{ position: "relative", display: "inline-flex" }}>
			<CircularProgress variant="determinate" {...props} />
			<Box
				sx={{
					top: 0,
					left: 0,
					bottom: 0,
					right: 0,
					position: "absolute",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Typography
					variant="caption"
					component="div"
					color="text.secondary"
				>{`${Math.round(props.value)}%`}</Typography>
			</Box>
		</Box>
	);
}

const ProgressSnackBar = (props: {
	snackBarOpen: Boolean;
	progressValue: number;
	message: string;
}) => {
	return (
		<Snackbar
			// @ts-ignore
			open={props.snackBarOpen}
			message={props.message}
			action={<CircularProgressWithLabel value={props.progressValue} />}
		/>
	);
};
const ExcelUploadDialog = ({ open, handleClose }: any) => {
	XLSX.set_fs(fs);
	// XLSX.stream.set_readable(Readable);
	// XLSX.set_cptable(cpexcel);

	const [HTML, setHTML] = React.useState("");
	const [snackBarOpen, setSnackBarOpen] = React.useState(false);
	const [snackBarMessage, setSnackBarMessage] = React.useState("");
	const [progressValue, setProgressValue] = React.useState(0);

	const handleApply = (e: BaseSyntheticEvent) => {
		if (HTML === "") {
			alert("파일을 선택해주세요.");
			return;
		}
		// parse Excel Rows to json
		const wb = XLSX.read(HTML, { type: "string" });
		const ws = wb.Sheets[wb.SheetNames[0]];
		const json: object[] = XLSX.utils.sheet_to_json(ws, {
			blankrows: true,
			defval: "None",
			raw: false,
		});
		setSnackBarOpen(true);
		setSnackBarMessage("Checking Excel Format...");
		try {
			excelHandler
				.setExcelContents(json)
				.buildUploader()
				.upload((dataIndex: number, totalContentNumber: number) => {
					setSnackBarMessage("Uploading...");
					setProgressValue(((dataIndex + 1) / totalContentNumber) * 100);
					if (dataIndex + 1 === totalContentNumber) {
						setSnackBarOpen(false);
					}
				});
		} catch (e) {
			alert(e.message);
			setSnackBarOpen(false);
		}
	};

	return (
		<>
			<Dialog
				fullWidth={true}
				maxWidth="lg"
				open={open}
				onClose={() => {
					handleClose();
					setHTML("");
				}}
			>
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
							accept=".xlsx"
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
					<Button
						onClick={() => {
							handleClose();
							setHTML("");
						}}
					>
						Close
					</Button>
				</DialogActions>
			</Dialog>
			<ProgressSnackBar
				snackBarOpen={snackBarOpen}
				progressValue={progressValue}
			/>
		</>
	);
};

export default ExcelUploadDialog;
