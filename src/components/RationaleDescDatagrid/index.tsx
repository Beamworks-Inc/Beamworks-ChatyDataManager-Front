import React, { useRef } from "react";
import SimpleDatagrid from "components/SimpleDatagrid";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { rowConverter, rowInverter } from "./util";
import { ContentAction } from "store/reducers/ContentReducer";
import { Box, Tooltip } from "@mui/material";

const isURL = (url: string) => {
	try {
		new URL(url);
		return true;
	} catch {
		return false;
	}
};

const LinkField = ({ link }: { link: string }) => {
	return isURL(link) ? (
		<a href={link} target="_blank">
			{link}
		</a>
	) : (
		<Tooltip
			arrow
			placement="top"
			title={link !== "..." && CONST.WARN_WRONG_LINK}
		>
			<div style={{ color: "red", fontWeight: "bolder" }}>{link}</div>
		</Tooltip>
	);
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

const CONST = {
	WARN_WRONG_LINK: "잘못된 링크 형식입니다.",
	INFO_DESC_TOOLTIP: "image, video에 대한 설명을 의미합니다.",
	INFO_LINK_TOOLTIP: "image, video에 대한 링크를 의미합니다.",
};

const columns = [
	{ field: "id", headerName: "id", hide: true },
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
			return <Box sx={scrollStyle}>{params.row.description || "..."}</Box>;
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
			<Tooltip placement="top" arrow title={CONST.INFO_LINK_TOOLTIP}>
				<LinkField link={params.row.link || "..."} />
			</Tooltip>
		),
	},
];

const RationaleDescDatagrid = () => {
	const apiRef = useRef();
	const columnsWithModelGetterColumn = [
		...columns,
		{
			field: " ",
			width: 0,
			renderCell: (params: any) => {
				apiRef.current = params.api;
				return null;
			},
		},
	];

	const handleCellEditDone = async () => {
		// 오류: 기존 작동 방식 (렌더링됨 -> 셀이 렌더링되면서 apiRef.current가 업데이트됨 -> 수정완료 이벤트 -> 이벤트 후 onCellEditDone이 실행됨 (dispatch) -> apiRef.current가 업데이트 되지 않은채로 dispatch!)
		// 해결: Async와 forceUpdate를 사용으로 해결
		await apiRef.current?.forceUpdate(); // TODO: don't know how to fix it!
		await dispatch(
			ContentAction.setCurrentContentRationaleDescriptions(
				rowInverter(apiRef.current?.getRowModels()) // TODO: don't know how to fix it!
			)
		);
	};

	const dispatch = useDispatch();

	const description = useSelector(
		(state: RootState) =>
			state.ContentReducer.currentContent.rationale.description
	); // QUESTION: 이렇게 길게 하는게 맞을까? Rerendering 이슈는 없으므로 CleanCode 관점에서 봐야할 것 같다.

	return (
		<SimpleDatagrid
			disableColumnSelector={true}
			rows={rowConverter(description)}
			columns={columnsWithModelGetterColumn}
			onCellEditDone={handleCellEditDone}
		/>
	);
};

export default React.memo(RationaleDescDatagrid);
