/**
 * QUESTION:
 * 1. ContentDetail 페이지의 다른 컴포넌트들은 data와 data관리 handler를 ContentDetail페이지에서 모두 관리하는데, 이 컴포넌트만 다른게 이상하지 않은가?
 * => 장점: Wrapping 컴포넌트를 만듦으로써 조금 더 Customizing이 유연하다.
 * => 단점: 코드량이 많아진다.
 */
import React, { useRef } from "react";
import SimpleDatagrid from "components/SimpleDatagrid";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { rowConverter, rowInverter } from "./util";
import { ContentAction } from "store/reducers/ContentReducer";
import { columns } from "./columns";

// icons
import AddIcon from "@mui/icons-material/AddCircleOutline";
import RemoveIcon from "@mui/icons-material/RemoveCircleOutline";

const AddIconComp = ({ iindex, handleOnClick }: any) => {
	const index = iindex - 1;
	return <AddIcon onClick={handleOnClick} data-rowindex={index} />;
};

const DeleteIconComp = ({ iindex, handleOnClick }: any) => {
	const index = iindex - 1;
	return <RemoveIcon onClick={handleOnClick} data-rowindex={index} />;
};

const ReferenceDatagrid = () => {
	const apiRef = useRef();
	const columnsWithModelGetterColumn = [
		...columns,
		{
			field: " ",
			width: 70,
			renderCell: (params: any) => {
				apiRef.current = params.api;
				return (
					<>
						<AddIconComp handleOnClick={handleRowAdd} iindex={params.id} />
						<DeleteIconComp
							handleOnClick={handleRowDelete}
							iindex={params.id}
						/>
					</>
				);
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

	const handleRowAdd = (event: React.MouseEvent) => {
		if (event.currentTarget.id === "add-row-btn") {
			const newRef = [...reference, { title: "", description: "", link: "" }];
			dispatch(ContentAction.setCurrentContentReferences(newRef));
		} else {
			const index = Number(event.currentTarget.getAttribute("data-rowindex"));
			const newRefObj = { title: "", description: "", link: "" };
			reference.splice(index + 1, 0, newRefObj);
			const newRef = [...reference];
			dispatch(ContentAction.setCurrentContentReferences(newRef));
		}
	};

	const handleRowDelete = (event: React.MouseEvent) => {
		const index = Number(event.currentTarget.getAttribute("data-rowindex"));
		reference.splice(index, 1);
		const newRef = [...reference];
		dispatch(ContentAction.setCurrentContentReferences(newRef));
	};

	const dispatch = useDispatch();

	const reference = useSelector(
		(state: RootState) => state.ContentReducer.currentContent.reference
	);

	return (
		<SimpleDatagrid
			rows={rowConverter(reference)}
			columns={columnsWithModelGetterColumn}
			onCellEditDone={handleCellEditDone}
			onRowAdd={handleRowAdd}
		/>
	);
};

export default React.memo(ReferenceDatagrid);
