import { Box, Input, Tooltip, Typography } from "@mui/material";
import { LinkField } from "./LinkField";

const CONST = {
	INFO_TITLE_TOOLTIP: "논문 제목 / 웹페이지를 대표하는 단어를 의미합니다.",
	INFO_DESC_TOOLTIP:
		"논문, 웹페이지에 대한 설명 / 찾게된 경위 / 근거들을 의미합니다.",
	INFO_LINK_TOOLTIP:
		"논문 / 웹페이지 온라인 링크를 의미합니다. (ex, dbpia, scienceon, 서울대병원 홈페이지..)",
	CELL_PLACEHOLDER: "내용을 입력해주세요.",
	LINK_CELL_PLACEHOLDER: "링크주소를 입력해주세요.",
};

const scrollStyle = {
	overflowX: "scroll",
	scrollbarWidth: "none",
	"&::-webkit-scrollbar": { height: "5px" },
	"&::-webkit-scrollbar-thumb": {
		backgroundColor: "#efefef",
		borderRadius: "10px",
	},
	"&::-webkit-scrollbar-thumb:hover": {
		backgroundColor: "#878787",
		borderRadius: "10px",
	},
};

export const columns = [
	{ field: "id", headerName: "id", hide: true },
	{
		field: "title",
		headerName: "title",
		type: "string",
		width: 200,
		editable: true,
		sortable: true,
		renderHeader: (params: any) => {
			return (
				<Tooltip placement="top" arrow title={CONST.INFO_TITLE_TOOLTIP}>
					<span>{params.field}</span>
				</Tooltip>
			);
		},
		renderCell: (params: any) => {
			return (
				<Box sx={scrollStyle}>{params.row.title || CONST.CELL_PLACEHOLDER}</Box>
			);
		},
	},
	{
		field: "description",
		headerName: "description",
		type: "string",
		width: 600,
		editable: true,
		sortable: false,
		renderHeader: (params: any) => {
			return (
				<Tooltip placement="top" arrow title={CONST.INFO_DESC_TOOLTIP}>
					<span>{params.field}</span>
				</Tooltip>
			);
		},
		renderCell: (params: any) => {
			return (
				<Box sx={scrollStyle}>
					{params.row.description || CONST.CELL_PLACEHOLDER}
				</Box>
			);
		},
	},
	{
		field: "link",
		headerName: "link",
		type: "string",
		width: 400,
		sortable: false,
		editable: true,
		renderHeader: (params: any) => {
			return (
				<Tooltip placement="top" arrow title={CONST.INFO_LINK_TOOLTIP}>
					<span>{params.field}</span>
				</Tooltip>
			);
		},
		renderCell: (params: any) => (
			<LinkField link={params.row.link || CONST.LINK_CELL_PLACEHOLDER} />
		),
	},
];
