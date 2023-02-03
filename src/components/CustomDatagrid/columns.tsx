function CellReferenceLinkComp({ params }: any) {
	return (
		<div
			style={{
				width: "100%",
				margin: "auto 0",
				cursor: "pointer",
				color: "blue",
				textDecoration: "underline",
			}}
			onClick={(e) => {
				e.preventDefault();
				e.stopPropagation();
				if (params.row.referenceLink) window.open(params.row.referenceLink);
			}}
		>
			{params.row.reference}
		</div>
	);
}

function CellRationaleLinkComp({ params }: any) {
	return (
		<div
			style={{
				width: "100%",
				margin: "auto 0",
				cursor: "pointer",
				color: "blue",
				textDecoration: "underline",
			}}
			onClick={(e) => {
				e.preventDefault();
				e.stopPropagation();
				if (params.row.rationaleLink) window.open(params.row.rationale);
			}}
		>
			{params.row.rationale}
		</div>
	);
}

export const columns = [
	// 1. 특정 칼럼의 값을 다른 칼럼을 통해 계산할 수 있습니다.
	// valueGetter: (params) => `${params.row.firstName || ''} ${params.row.lastName || ''}`
	// 2. 마우스 오버시 툴팁을 표시할 수 있습니다.
	// description: 'This column has a value getter and is not sortable.',
	{ field: "id", headerName: "ID", width: 90, sortable: true },
	{
		field: "question",
		headerName: "Question",
		width: 310,
		sortable: false,
		editable: false,
	},
	{
		field: "answer",
		headerName: "Answer",
		width: 310,
		sortable: false,
		editable: false,
	},
	// {
	// 	field: "reference",
	// 	headerName: "Reference",
	// 	width: 110,
	// 	editable: false,
	// 	description: "논문 서치 정보, 웹페이지 링크등을 사용합니다.",
	// 	// @ts-ignore
	// 	renderCell: (params) => <CellReferenceLinkComp params={params} />,
	// },
	// {
	// 	field: "referenceLink",
	// 	headerName: "reference link",
	// 	width: 200,
	// 	hide: true,
	// },
	// {
	// 	field: "rationale",
	// 	headerName: "Rationale",
	// 	width: 110,
	// 	editable: false,
	// 	description: "A에 대한 부가 자료 (Link, Image, Movie)",
	// 	// @ts-ignore
	// 	renderCell: (params) => <CellRationaleLinkComp params={params} />,
	// },
	// {
	// 	field: "rationaleLink",
	// 	headerName: "rationale link",
	// 	width: 200,
	// 	hide: true,
	// },
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
];
