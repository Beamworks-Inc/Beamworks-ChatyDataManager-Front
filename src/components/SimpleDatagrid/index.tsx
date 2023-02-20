import React from "react";
import { GridCell, GridCellProps } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import { DataGrid, GridCellEditStopParams, MuiEvent } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
	"& .MuiDataGrid-columnHeaders": {
		backgroundColor: theme.palette.mode === "light" ? "#efefef" : "#ff0000",
	},
}));

function CustomFooterComp({ handleClickBtn }: any) {
	return (
		<Box sx={{ p: 1, display: "flex", justifyContent: "center" }}>
			<Button
				id="add-row-btn"
				variant="text"
				color="secondary"
				onClick={handleClickBtn}
			>
				<AddIcon />
				Add Row
			</Button>
		</Box>
	);
}

const CustomCell = (props: GridCellProps) => {
	const { children, ...other } = props;

	return (
		<GridCell {...other}>
			{other.cellMode === "edit" ||
			(props.value != null && props.value !== "") ? (
				<div style={{ color: "black" }}>{children}</div>
			) : (
				<div style={{ color: "gray" }}>{children}</div>
			)}
		</GridCell>
	);
};

// This component is used for Content-detail page
const SimpleDatagrid = ({ rows, columns, onCellEditDone, onRowAdd }: any) => {
	return (
		<>
			<StyledDataGrid
				disableColumnSelector={true}
				autoHeight
				rows={rows}
				columns={columns}
				disableSelectionOnClick
				experimentalFeatures={{ newEditingApi: true }}
				onCellEditStop={(params: GridCellEditStopParams, event: MuiEvent) => {
					onCellEditDone();
				}}
				components={{
					Cell: CustomCell,
					Footer: CustomFooterComp,
				}}
				componentsProps={{
					footer: { handleClickBtn: onRowAdd },
				}}
			/>
		</>
	);
};

export default React.memo(SimpleDatagrid);
