// import React from "react";
// import { read, utils, writeFile } from 'xlsx';

// /* The live editor requires this function wrapper */
// function Tabeller(props) {
// 	const [__html, setHTML] = React.useState("");

// 	/* Load sample data once */
// 	React.useEffect(() => {
// 		/* Starting CSV data -- change data here */
// 		const csv = `\
//                     This,is,a,Test
//                     வணக்கம்,สวัสดี,你好,가지마
//                     1,2,3,4`;

// 		/* Parse CSV into a workbook object */
// 		const wb = XLSX.read(csv, { type: "string" });

// 		/* Get the worksheet (default name "Sheet1") */
// 		const ws = wb.Sheets.Sheet1;

// 		/* Create HTML table */
// 		setHTML(XLSX.utils.sheet_to_html(ws, { id: "tabeller" }));
// 	}, []);

// 	return (
// 		<>
// 			{/* Import Button */}
// 			<input
// 				type="file"
// 				onChange={async (e) => {
// 					/* get data as an ArrayBuffer */
// 					const file = e.target.files[0];
// 					const data = await file.arrayBuffer();

// 					/* parse and load first worksheet */
// 					const wb = XLSX.read(data);
// 					const ws = wb.Sheets[wb.SheetNames[0]];
// 					setHTML(XLSX.utils.sheet_to_html(ws, { id: "tabeller" }));
// 				}}
// 			/>

// 			{/* Export Button */}
// 			<button
// 				onClick={() => {
// 					/* Create worksheet from HTML DOM TABLE */
// 					const table = document.getElementById("tabeller");
// 					const wb = XLSX.utils.table_to_book(table);

// 					/* Export to file (start a download) */
// 					XLSX.writeFile(wb, "SheetJSIntro.xlsx");
// 				}}
// 			>
// 				<b>Export XLSX!</b>
// 			</button>

// 			{/* Show HTML preview */}
// 			<div dangerouslySetInnerHTML={{ __html }} />
// 		</>
// 	);
// }
