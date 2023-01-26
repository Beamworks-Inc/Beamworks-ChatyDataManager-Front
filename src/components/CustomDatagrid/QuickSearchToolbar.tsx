import { Box } from "@mui/material";
import { GridToolbarQuickFilter } from "@mui/x-data-grid";

export default function QuickSearchToolbar() {
	// TODO: make it search by date too
	return (
		<Box
			sx={{
				p: 0.5,
				pb: 0,
				ml: 0.5,
			}}
		>
			<GridToolbarQuickFilter
				quickFilterParser={(searchInput) =>
					searchInput
						.split(",")
						.map((value) => value.trim())
						.filter((value) => value !== "")
				}
			/>
		</Box>
	);
}
