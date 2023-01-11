import React, { useRef } from "react";
import SimpleDatagrid from "components/SimpleDatagrid";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { rowConverter, rowInverter } from "./util";
import { ContentAction } from "store/reducers/ContentReducer";

const columns = [
  { field: "id", headerName: "id", hide: true },
  {
    field: "description",
    headerName: "description",
    type: "string",
    width: 600,
    editable: true,
    sortable: false,
    renderCell: (params: any) => {
      return <div>{params.row.description || "..."}</div>;
    },
  },
  {
    field: "link",
    headerName: "link",
    type: "string",
    width: 400,
    editable: true,
    renderCell: (params: any) => {
      return <div>{params.row.link || "..."}</div>;
    },
  },
];

const ReationaleDescDatagrid = () => {
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
      rows={rowConverter(description)}
      columns={columnsWithModelGetterColumn}
      onCellEditDone={handleCellEditDone}
    />
  );
};

export default React.memo(ReationaleDescDatagrid);
