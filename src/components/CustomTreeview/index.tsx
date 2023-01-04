import React from "react";
import { TreeItem, TreeView } from "@mui/lab";
import { Box, Button } from "@mui/material";

// modules
import { useNavigate, useParams } from "react-router-dom";
import { Treeitem } from "interfaces/Content.interface";

// redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { ContentAction } from "store/reducers/ContentReducer";

// icons
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

// styles
const inputStyle = {
	width: "60%",
	height: "20px",
	border: "0px",
	position: "absolute",
	top: "1px",
	left: "30px",
	zIndex: "1",
} as React.CSSProperties;

const divStyle = {
	display: "inline-block",
	width: "100%",
	position: "relative",
} as React.CSSProperties;

// TODO: 지금은 얼러트만 띄움. 구현필요. (마지막에할예정)
const editButtonClick = (event: React.MouseEvent, item: Treeitem) => {
	event.stopPropagation();
	alert("editButtonClick");
};

const addButtonClick = (event: React.MouseEvent, item: Treeitem) => {
	event.stopPropagation();
	alert("addButtonClick");
};

const removeButtonClick = (event: React.MouseEvent, item: Treeitem) => {
	event.stopPropagation();
	alert("removeButtonClick");
};

const checkButtonClick = (event: React.MouseEvent, item: Treeitem) => {
	event.stopPropagation();
	alert("checkButtonClick");
};

const closeButtonClick = (event: React.MouseEvent, item: Treeitem) => {
	event.stopPropagation();
	alert("closeButtonClick");
};

const renderEditActionButtons = (item: Treeitem) => {
	return (
		<div style={{ position: "absolute", right: "0px", top: "0px" }}>
			<CheckIcon
				onClick={(event) => checkButtonClick(event, item)}
				fontSize="small"
			/>
			<CloseIcon
				onClick={(event) => closeButtonClick(event, item)}
				fontSize="small"
			/>
		</div>
	);
};

const renderNormalActionButtons = (item: Treeitem) => {
	return (
		<div
			style={{
				position: "absolute",
				right: "0px",
				top: "0px",
			}}
		>
			<EditIcon
				onClick={(event) => editButtonClick(event, item)}
				fontSize="small"
			/>
			<AddIcon
				onClick={(event) => addButtonClick(event, item)}
				fontSize="small"
			/>
			<RemoveIcon
				onClick={(event) => removeButtonClick(event, item)}
				fontSize="small"
			/>
		</div>
	);
};

const editMode = (item: Treeitem) => {
	return <input value={item.name} style={inputStyle} type="text" />;
};

/**
 * 이 함수는 재귀적으로 TreeItem을 만들어주는 함수입니다.
 * TreeItem의 nodeId로는 순차적으로 증가하는 count를 사용하기 때문에, count를 Wrapper함수의 지역변수로 선언해줍니다.
 * Wrapper가 없다면(count를 해당 파일의 전역변수로 선언하는경우) : count가 계속 증가하면서, 새로고침할때마다 TreeItem의 nodeId가 누적되어 오류가 발생합니다.
 */
const RecursiveTreeViewWrapper = (item: Treeitem) => {
	let nodeId = 1;
	const RecursiveTreeView = (item: Treeitem) => (
		// TODO: TreeItem에 CustomComponent를 넣는 방법을 찾아야함.
		<div style={divStyle}>
			{item.isEditMode ? editMode(item) : null}
			<TreeItem
				onClick={() => alert("click")}
				style={{ position: "relative" }}
				nodeId={nodeId.toString()}
				label={item.name}
			>
				{item.children.map((item) => {
					nodeId += 1;
					return RecursiveTreeView(item);
				})}
			</TreeItem>
			{item.isEditMode
				? renderEditActionButtons(item)
				: renderNormalActionButtons(item)}
		</div>
	);
	return RecursiveTreeView(item);
};

export default function CustomTreeview() {
	const items = useSelector(
		(state: RootState) => state.ContentReducer.menuItems
	);
	const navigate = useNavigate();

	// TODO: categoryNodes를 동적으로 만들도록 수정해야함.
	const categoryNodes = ["1", "2", "5"];
	const [expanded, setExpanded] = React.useState(categoryNodes);
	const [selected, setSelected] = React.useState([]);

	const handleToggle = (event, nodeIds) => {
		setExpanded(nodeIds);
	};

	const handleSelect = (event, nodeIds) => {
		setSelected(nodeIds);
		// if nodeIds not in categoryNodes, then navigate
		if (nodeIds.length === 1 && !categoryNodes.includes(nodeIds[0]))
			navigate("/content/" + nodeIds[0]);
	};

	const handleExpandClick = () => {
		setExpanded((oldExpanded) =>
			oldExpanded.length === 0 ? categoryNodes : []
		);
	};

	return (
		<Box
			sx={{
				height: 550,
				flexGrow: 1,
				maxWidth: 400,
				overflowY: "auto",
			}}
		>
			<Box sx={{ display: "flex", justifyContent: "center" }}>
				<Button onClick={handleExpandClick}>
					{expanded.length === 0 ? "Expand all" : "Collapse all"}
				</Button>
			</Box>
			<TreeView
				aria-label="controlled"
				defaultCollapseIcon={<ExpandMoreIcon />}
				defaultExpandIcon={<ChevronRightIcon />}
				expanded={expanded}
				selected={selected}
				onNodeToggle={handleToggle}
				onNodeSelect={handleSelect}
				// multiSelect
			>
				{/* make TreeItem by traversing TreeItem */}
				{items && RecursiveTreeViewWrapper(items)}
			</TreeView>
		</Box>
	);
}
