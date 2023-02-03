import React from "react";

import { styled } from "@mui/material/styles";
import { DataGrid, GridCellEditStopParams, MuiEvent } from "@mui/x-data-grid";

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
	"& .MuiDataGrid-columnHeaders": {
		backgroundColor: theme.palette.mode === "light" ? "#efefef" : "#ff0000",
	},
}));

// This component is used for Content-detail page
const SimpleDatagrid = ({ rows, columns, onCellEditDone }: any) => {
	return (
		<>
			<StyledDataGrid
				disableColumnSelector={true}
				autoHeight
				rows={rows}
				columns={columns}
				pageSize={3}
				rowsPerPageOptions={[3]}
				disableSelectionOnClick
				experimentalFeatures={{ newEditingApi: true }}
				onCellEditStop={(params: GridCellEditStopParams, event: MuiEvent) => {
					// if ( params.reason === GridCellEditStopReasons.cellFocusOut )
					onCellEditDone();
				}}
			/>
		</>
	);
};

export default React.memo(SimpleDatagrid);
