import { styled } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import {
	IReference,
	IRationaleDescription,
} from "interfaces/Content.interface";
import React from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { ContentAction } from "store/reducers/ContentReducer";

// from fetched data to data grid rows
function rowConverter(rows: IReference[] | IRationaleDescription[]): any[] {
	return rows.map((row, idx) => {
		return {
			id: idx + 1,
			title: row.title === "" ? "" : undefined, // TODO: Don't know how to fix it
			description: row.description,
			link: row.link,
		};
	});
}

// from data grid row models to fetched data
function rowInverter(
	rows: Map<any, any>
): [IReference[] | IRationaleDescription[], string] {
	const arr = [] as IReference[] | IRationaleDescription[];
	let type = "reference";
	rows.forEach((row) => {
		const objectForReducer = {
			title: row.title,
			description: row.description,
			link: row.link,
		};
		if (row.title === undefined) {
			delete objectForReducer.title;
			type = "rationaleDescription";
		}
		arr.push(objectForReducer);
	});
	return [arr, type];
}

function checkIfTitleIsHidden(rows: IReference[] | IRationaleDescription[]) {
	return rows[0]?.title === undefined;
}
const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
	"& .MuiDataGrid-columnHeaders": {
		backgroundColor: theme.palette.mode === "light" ? "#efefef" : "#ff0000",
	},
}));

// This component is used for Content-detail page

const SimpleDatagrid = ({ rows }) => {
	const apiRef = useRef(null);
	const dispatch = useDispatch();
	const content = useSelector(
		(state: RootState) => state.ContentReducer.currentContent
	);

	const columns = [
		{ field: "id", headerName: "ID", hide: true },
		{
			field: "title",
			headerName: "title",
			type: "string",
			width: 200,
			editable: true,
			hide: checkIfTitleIsHidden(rows),
			sortable: false,
			renderCell: (params: any) => {
				return <div>{params.row.title || "..."}</div>;
			},
		},
		{
			field: "description",
			headerName: "description",
			type: "string",
			width: 600,
			editable: true,
			sortable: false,
			renderCell: (params: any) => {
				return <div>{params.row.description || "..."}</div>;
			},
		},
		{
			field: "link",
			headerName: "link",
			type: "string",
			width: 400,
			editable: true,
			renderCell: (params: any) => {
				return <div>{params.row.link || "..."}</div>;
			},
		},
		{
			field: " ",
			width: 0,
			renderCell: (params: any) => {
				apiRef.current = params.api;
				let [newGridData, type] = rowInverter(apiRef.current?.getRowModels());
				const newContent = content;
				if (type === "reference") newContent.reference = newGridData;
				else if (type === "rationaleDescription")
					newContent.rationale.description = newGridData;
				dispatch(ContentAction.setCurrentContent(newContent));
				return null;
			},
		},
	];

	// TODO: ref를 이해하기 좋은 예시. ref 활용 방법 찾아보기
	// function useApiRef() {
	// 	const apiRef = useRef(null);
	// 	const _columns = useMemo(
	// 		() =>
	// 			columns.concat({
	// 				field: " ",
	// 				width: 0,
	// 				renderCell: (params) => {
	// 					apiRef.current = params.api;
	// 					return null;
	// 				},
	// 			}),
	// 		[columns]
	// 	);

	// 	return { apiRef, _columns };
	// }

	// const { apiRef, _columns } = useApiRef();

	return (
		<>
			<StyledDataGrid
				autoHeight
				rows={rowConverter(rows)}
				columns={columns}
				pageSize={3}
				rowsPerPageOptions={[3]}
				disableSelectionOnClick
				experimentalFeatures={{ newEditingApi: true }}
				// TODO: state가 수정 전의 값이 나오는 이유를 알아내서 수정하기
				// onCellEditStop={(params: GridCellEditStopParams, event: MuiEvent) => {
				// 	if (
				// 		params.reason === GridCellEditStopReasons.cellFocusOut ||
				// 		params.reason === GridCellEditStopReasons.escapeKeyDown ||
				// 		params.reason === GridCellEditStopReasons.enterKeyDown
				// 	) {
				// 		// onCellEditStop은 수정이 commit 되었을때 호출되지만,
				// 		// apiRef.current.getRowModels()에 반영이 되어있지 않다..
				// 		console.log(apiRef.current?.getRowModels()); // 수정 전의 값이 나옴
				// 		let [newGridData, type] = rowInverter(
				// 			apiRef.current?.getRowModels()
				// 		);
				// 		const newContent = content;
				// 		if (type === "reference") newContent.reference = newGridData;
				// 		else if (type === "rationaleDescription")
				// 			newContent.rationale.description = newGridData;
				// 		dispatch(ContentAction.setCurrentContent(newContent));
				// 	}
				// }}
			/>
		</>
	);
};

export default React.memo(SimpleDatagrid);
