// modules
import { Dispatch, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DataGrid, GridLinkOperator } from "@mui/x-data-grid";

// project modules
import ContentsAPI from "apis/content";
import { KeywordDto, User } from "interfaces/Content.interface";
import { fromContentToRow } from "./util";

// redux
import { RootState } from "store";
import { AnyAction } from "redux";
import { ContentAction } from "store/reducers/ContentReducer";

// components
import { columns } from "./columns";
import QuickSearchToolbar from "./QuickSearchToolbar";

// styles
const gridRowStyles = {
	"& .MuiDataGrid-row.Mui-even": {
		backgroundColor: "#ffffff",
	},
	"& .MuiDataGrid-row.Mui-even:hover": {
		backgroundColor: "#e0e0e0",
	},
	"& .MuiDataGrid-row.Mui-odd": {
		backgroundColor: "#f0f0f0",
	},
	"& .MuiDataGrid-row.Mui-odd:hover": {
		backgroundColor: "#e0e0e0",
	},
};

function fetchContent(
	user: User,
	selectedCategory: KeywordDto[],
	dispatch: Dispatch<AnyAction>
) {
	const selectedCategoryNames: string[] = selectedCategory.map(
		(category) => category.name
	);
	if (user.role == "REVIEWER") {
		ContentsAPI.findAllContentsContainReviewerKeyword(selectedCategoryNames)
			.then((res) => {
				dispatch(ContentAction.setContentList(res.data));
			})
			.catch((err) => {
				alert("컨텐츠 데이터를 가져오는 중 에러가 발생했습니다.");
			});
	} else if (user.role == "USER") {
		ContentsAPI.findAllContentsContainKeyword(selectedCategoryNames)
			.then((res) => {
				dispatch(ContentAction.setContentList(res.data));
			})
			.catch((err) => {
				alert("컨텐츠 데이터를 가져오는 중 에러가 발생했습니다.");
			});
	} else {
		throw new Error("Invalid role");
	}
}

const CustomDatagrid = () => {
	// hooks
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// states
	const selectedCategory: KeywordDto[] = useSelector(
		(state: RootState) => state.ContentReducer.selectedCategoryList
	);
	const user = useSelector((state: RootState) => state.UserReducer);
	const rows = fromContentToRow(
		useSelector((state: RootState) => state.ContentReducer.contentListState)
	);

	// effects
	useEffect(() => {
		fetchContent(user, selectedCategory, dispatch);
	}, [selectedCategory, user]);

	// handlers
	const handleRowClick = (e: any) => {
		const contentId = e.id;
		navigate(`/content/${contentId}`);
	};

	return (
		<DataGrid
			onRowClick={handleRowClick}
			initialState={{
				filter: {
					filterModel: {
						items: [],
						quickFilterLogicOperator: GridLinkOperator.Or,
					},
				},
			}}
			components={{ Toolbar: QuickSearchToolbar }}
			sx={gridRowStyles}
			getRowClassName={(params) =>
				params.indexRelativeToCurrentPage % 2 === 0 ? "Mui-even" : "Mui-odd"
			}
			rows={rows}
			columns={columns}
			pageSize={5}
			rowsPerPageOptions={[5]}
			disableSelectionOnClick
			experimentalFeatures={{ newEditingApi: true }}
		/>
	);
};

export default CustomDatagrid;
