import { Box } from "@mui/material";

import {
	DataGrid,
	GridToolbarQuickFilter,
	GridLinkOperator,
} from "@mui/x-data-grid";
import ContentsAPI from "apis/content";
import { AxiosError, AxiosResponse } from "axios";
import {Content, ContentForGrid, KeywordDto, User} from "interfaces/Content.interface";
import {Dispatch, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { RootState } from "store";
import { ContentAction } from "store/reducers/ContentReducer";
import {AnyAction} from "redux";

function QuickSearchToolbar() {
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

const columns = [
	// 1. 특정 칼럼의 값을 다른 칼럼을 통해 계산할 수 있습니다.
	// valueGetter: (params) => `${params.row.firstName || ''} ${params.row.lastName || ''}`
	// 2. 마우스 오버시 툴팁을 표시할 수 있습니다.
	// description: 'This column has a value getter and is not sortable.',
	{ field: "id", headerName: "ID", width: 90, sortable: false },
	{
		field: "question",
		headerName: "Question",
		width: 200,
		sortable: false,
		editable: false,
	},
	{
		field: "answer",
		headerName: "Answer",
		width: 200,
		sortable: false,
		editable: false,
	},
	{
		field: "reference",
		headerName: "Reference",
		width: 110,
		editable: false,
		description: "논문 서치 정보, 웹페이지 링크등을 사용합니다.",
		renderCell: (params) => (
			<a href={params.row.referenceLink}>{params.row.reference}</a>
		),
	},
	{
		field: "referenceLink",
		headerName: "reference link",
		width: 200,
		hide: true,
	},
	{
		field: "rationale",
		headerName: "Rationale",
		width: 110,
		editable: false,
		description: "A에 대한 부가 자료 (Link, Image, Movie)",
		renderCell: (params) => (
			<a href={params.row.rationaleLink}>{params.row.rationale}</a>
		),
	},
	{
		field: "rationaleLink",
		headerName: "rationale link",
		width: 200,
		hide: true,
	},
	{
		field: "writer",
		headerName: "Writer",
		width: 110,
		editable: false,
	},
	{
		field: "writeDate",
		headerName: "write date",
		type: "date",
		width: 110,
		editable: false,
		renderCell: (params: any) => {
			return <div>{params.row.writeDate.slice(0, 10)}</div>;
		},
	},
	{
		field: "reviewer",
		headerName: "Reviewer",
		width: 110,
		editable: false,
	},
	{
		field: "reviewDate",
		headerName: "review date",
		type: "date",
		width: 110,
		editable: false,
	},
	{
		field: "status",
		headerName: "status",
		type: "string",
		width: 110,
		editable: false,
	},
	// {
	//     field: 'fullName',
	//     headerName: 'Full name',
	//     sortable: false,
	//     width: 160,
	//     valueGetter: (params) => `${params.row.firstName || ''} ${params.row.lastName || ''}`
	// }
];

function fromContentToRow(contents: Content[]): ContentForGrid[] {
	return contents.map((content) => {
		return {
			id: content?.id || "No data",
			question: content?.question || "No data",
			answer: content?.answer || "No data",
			reference: content?.reference[0]?.title || "No data",
			referenceLink: content?.reference[0]?.link?.toString() || "No data",
			rationale: content?.rationale?.description[0]?.description || "No data",
			rationaleLink:
				content?.rationale?.description[0].link?.toString() || "No data",
			writer: content?.writer?.name || "No data",
			writeDate: content?.writeDate?.toString() || "No data",
			reviewer: content?.review?.reviewer?.name || "No data",
			reviewDate: content?.review?.reviewDate?.toString() || "No data",
			status: content?.status || "No data",
		};
	});
}

function fetchContent(user: User, selectedCategory: KeywordDto[], dispatch: Dispatch<AnyAction>) {
	const selectedCategoryNames: string[] = selectedCategory.map((category) => category.name);
	if (user.role == "REVIEWER") {
		ContentsAPI.findAllContentsContainReviewerKeyword(selectedCategoryNames)
			.then((res) => {
				dispatch(ContentAction.setContentList(res.data));
			})
			.catch((err) => {
				alert('컨텐츠 데이터를 가져오는 중 에러가 발생했습니다.')
			})
	} else if (user.role == "USER") {
		ContentsAPI.findAllContentsContainKeyword(selectedCategoryNames)
			.then((res) => {
				dispatch(ContentAction.setContentList(res.data));
			})
			.catch((err) => {
				alert('컨텐츠 데이터를 가져오는 중 에러가 발생했습니다.')
			})
	} else {
		throw new Error("Invalid role");
	}
}

const CustomDatagrid = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const { folderId } = useParams();
	const selectedCategory: KeywordDto[]=useSelector((state:RootState)=>state.ContentReducer.selectedCategoryList);
	const user=useSelector((state:RootState)=>state.UserReducer);

	useEffect(()=> {
		fetchContent(user, selectedCategory, dispatch);
	},[selectedCategory,user])

	useEffect(() => {
		// folderName에 따라 서버로부터 컨텐츠리스트를 받아 업데이트합니다.
		if (folderId === undefined) return;
		ContentsAPI.findAllByFolderId(Number(folderId))
			.then((response: AxiosResponse) => {
				const contentList = response.data as Content[];
				dispatch(ContentAction.setContentList(contentList));
			})
			.catch((error: AxiosError) =>
				alert(`컨텐츠 리스트 불러오기 에러, code:(${error.code})`)
			);
	}, [location]);

	const rows = fromContentToRow(
		useSelector((state: RootState) => state.ContentReducer.contentListState)
	);

	return (
		<DataGrid
			onRowClick={(e: any) => {
				const contentId = e.id;
				navigate(`/content/${folderId}/${contentId}`);
			}}
			initialState={{
				filter: {
					filterModel: {
						items: [],
						quickFilterLogicOperator: GridLinkOperator.Or,
					},
				},
			}}
			components={{ Toolbar: QuickSearchToolbar }}
			sx={{
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
			}}
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
