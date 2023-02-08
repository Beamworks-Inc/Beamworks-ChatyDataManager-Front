/**
 * QUESTION:
 * 1. ContentDetail 페이지의 다른 컴포넌트들은 data와 data관리 handler를 ContentDetail페이지에서 모두 관리하는데, 이 컴포넌트만 다른게 이상하지 않은가?
 * => 장점: Wrapping 컴포넌트를 만듦으로써 조금 더 Customizing이 유연하다.
 * => 단점: 코드량이 많아진다.
 */
import React, { useRef, useState } from "react";
import SimpleDatagrid from "components/SimpleDatagrid";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { rowConverter, rowInverter } from "./util";
import { ContentAction } from "store/reducers/ContentReducer";
import { Box, Tooltip } from "@mui/material";

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
	WARN_WRONG_LINK: "링크가 잘못되었습니다. 링크를 그대로 붙여넣기 해주세요.",
	INFO_TITLE_TOOLTIP: "논문 제목 / 웹페이지를 대표하는 단어를 의미합니다.",
	INFO_DESC_TOOLTIP:
		"논문, 웹페이지에 대한 설명 / 찾게된 경위 / 근거들을 의미합니다.",
	INFO_LINK_TOOLTIP:
		"논문 / 웹페이지 온라인 링크를 의미합니다. (ex, dbpia, scienceon, 서울대병원 홈페이지..)",
};

const columns = [
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
			return <Box sx={scrollStyle}>{params.row.title || "..."}</Box>;
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
		renderCell: (params: any) => <LinkField link={params.row.link || "..."} />,
	},
];

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

const ReferenceDatagrid = () => {
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

	// ! async 없이 작동 하지 않습니다.
	const handleCellEditDone = async () => {
		// 오류: 기존 작동 방식 (렌더링됨 -> 셀이 렌더링되면서 apiRef.current가 업데이트됨 -> 수정완료 이벤트 -> 이벤트 후 onCellEditDone이 실행됨 (dispatch) -> apiRef.current가 업데이트 되지 않은채로 dispatch!)
		// 해결: Async와 forceUpdate를 사용으로 해결
		// @ts-ignore
		await apiRef.current?.forceUpdate(); // TODO: don't know how to fix it!
		await dispatch(
			ContentAction.setCurrentContentReferences(
				// @ts-ignore
				rowInverter(apiRef.current?.getRowModels()) // TODO: don't know how to fix it!
			)
		);
	};

	const dispatch = useDispatch();

	const reference = useSelector(
		(state: RootState) => state.ContentReducer.currentContent.reference
	); // QUESTION: 이렇게 길게 하는게 맞을까? Rerendering 이슈는 없으므로 CleanCode 관점에서 봐야할 것 같다.

	return (
		<SimpleDatagrid
			rows={rowConverter(reference)}
			columns={columnsWithModelGetterColumn}
			onCellEditDone={handleCellEditDone}
		/>
	);
};

export default React.memo(ReferenceDatagrid);
