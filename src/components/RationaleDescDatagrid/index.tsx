import React, { useRef } from "react";

// redux
import { RootState } from "store";
import { useDispatch, useSelector } from "react-redux";
import { ContentAction } from "store/reducers/ContentReducer";

// icons
import AddIcon from "@mui/icons-material/AddCircleOutline";
import RemoveIcon from "@mui/icons-material/RemoveCircleOutline";

// project
import { columns } from "./columns";
import { rowConverter, rowInverter } from "./util";
import SimpleDatagrid from "components/SimpleDatagrid";

const AddIconComp = ({ iindex, handleOnClick }: any) => {
	const index = iindex - 1;
	return <AddIcon onClick={handleOnClick} data-rowindex={index} />;
};

const DeleteIconComp = ({ iindex, handleOnClick }: any) => {
	const index = iindex - 1;
	return <RemoveIcon onClick={handleOnClick} data-rowindex={index} />;
};

const RationaleDescDatagrid = () => {
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

	const handleCellEditDone = async () => {
		// 오류: 기존 작동 방식 (렌더링됨 -> 셀이 렌더링되면서 apiRef.current가 업데이트됨 -> 수정완료 이벤트 -> 이벤트 후 onCellEditDone이 실행됨 (dispatch) -> apiRef.current가 업데이트 되지 않은채로 dispatch!)
		// 해결: Async와 forceUpdate를 사용으로 해결
		// @ts-ignore
		await apiRef.current?.forceUpdate(); // TODO: don't know how to fix it!
		await dispatch(
			ContentAction.setCurrentContentRationaleDescriptions(
				// @ts-ignore
				rowInverter(apiRef.current?.getRowModels()) // TODO: don't know how to fix it!
			)
		);
	};

	const handleRowAdd = (event: React.MouseEvent) => {
		if (event.currentTarget.id === "add-row-btn") {
			const newDesc = [...description, { description: "", link: "" }];
			dispatch(ContentAction.setCurrentContentRationaleDescriptions(newDesc));
		} else {
			const index = Number(event.currentTarget.getAttribute("data-rowindex"));
			const newDescObj = { description: "", link: "" };
			description.splice(index + 1, 0, newDescObj);
			const newDesc = [...description];
			dispatch(ContentAction.setCurrentContentRationaleDescriptions(newDesc));
		}
	};

	const handleRowDelete = (event: React.MouseEvent) => {
		const index = Number(event.currentTarget.getAttribute("data-rowindex"));
		description.splice(index, 1);
		const newDesc = [...description];
		dispatch(ContentAction.setCurrentContentRationaleDescriptions(newDesc));
	};

	const dispatch = useDispatch();

	const description = useSelector(
		(state: RootState) =>
			state.ContentReducer.currentContent.rationale.description
	);

	return (
		<SimpleDatagrid
			disableColumnSelector={true}
			rows={rowConverter(description)}
			columns={columnsWithModelGetterColumn}
			onRowAdd={handleRowAdd}
			onCellEditDone={handleCellEditDone}
		/>
	);
};

export default React.memo(RationaleDescDatagrid);
