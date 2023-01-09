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
import { LeftSquareTwoTone } from "@ant-design/icons";

// styles

const divStyle = {
	display: "inline-block",
	width: "100%",
	position: "relative",
} as React.CSSProperties;

export default function CustomTreeview() {
	const updateTreeRoot = (root: Treeitem, item: Treeitem) => {
		if (root.id === item.id) {
			return item;
		} else {
			if (root.children) {
				root.children = root.children.map((child) => {
					return updateTreeRoot(child, item);
				});
			}
			return root;
		}
	};

	const NormalModeComponent = ({
		root,
		item,
	}: {
		root: Treeitem;
		item: Treeitem;
	}) => {
		const divStyle = {
			position: "absolute",
			right: "0px",
			top: "0px",
			zIndex: "2",
		} as React.CSSProperties;

		const handleEditButtonClick = (event: React.MouseEvent) => {
			event.stopPropagation();
			item.isEditMode = true;
			root = updateTreeRoot(root, item);
			dispatch(ContentAction.setMenuItems({ ...root }));
		};

		return (
			<div style={divStyle}>
				<EditIcon onClick={handleEditButtonClick} fontSize="small" />
				{/* <AddIcon
					onClick={handleAddButtonClick}
					fontSize="small"
				/>
				<RemoveIcon
					onClick={handleRemoveButtonClick}
					fontSize="small"
				/> */}
			</div>
		);
	};

	const EditModeComponent = ({
		root,
		item,
	}: {
		root: Treeitem;
		item: Treeitem;
	}) => {
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
			position: "absolute",
			right: "0px",
			top: "0px",
			zIndex: "2",
		} as React.CSSProperties;

		const [value, setValue] = React.useState(item.name);

		const handleOnChangeInput = (
			event: React.ChangeEvent<HTMLInputElement>
		) => {
			setValue(event.target.value);
		};

		const handleCheckIconClick = (event: React.MouseEvent) => {
			event.stopPropagation();
			item.isEditMode = false;
			root = updateTreeRoot(root, item);
			dispatch(ContentAction.setMenuItems({ ...root }));
		};

		const handleCloseIconClick = (event: React.MouseEvent) => {
			event.stopPropagation();
			item.isEditMode = false;
			// no update
			dispatch(ContentAction.setMenuItems({ ...root }));
		};

		return (
			<>
				<input
					style={inputStyle}
					value={value}
					onChange={handleOnChangeInput}
					type="text"
				/>
				<div style={divStyle}>
					<CheckIcon onClick={handleCheckIconClick} fontSize="small" />
					<CloseIcon onClick={handleCloseIconClick} fontSize="small" />
				</div>
			</>
		);
	};

	/**
	 * 이 함수는 재귀적으로 TreeItem을 만들어주는 함수입니다.
	 * TreeItem의 nodeId로는 순차적으로 증가하는 count를 사용하기 때문에, count를 Wrapper함수의 지역변수로 선언해줍니다.
	 * Wrapper가 없다면(count를 해당 파일의 전역변수로 선언하는경우) : count가 계속 증가하면서, 새로고침할때마다 TreeItem의 nodeId가 누적되어 오류가 발생합니다.
	 */
	const RecursiveTreeViewWrapper = (root: Treeitem, item: Treeitem) => {
		let nodeId = 1;
		const RecursiveTreeView = (root: Treeitem, item: Treeitem) => (
			// TODO: TreeItem에 CustomComponent를 넣는 방법을 찾아야함.
			<div style={divStyle}>
				{item.isEditMode ? (
					<EditModeComponent root={root} item={item} />
				) : (
					<NormalModeComponent root={root} item={item} />
				)}
				<TreeItem
					style={{ position: "relative" }}
					nodeId={nodeId.toString()}
					label={item.name}
				>
					{item.children.map((item) => {
						nodeId += 1;
						return RecursiveTreeView(root, item);
					})}
				</TreeItem>
			</div>
		);
		return RecursiveTreeView(root, item);
	};

	const items = useSelector(
		(state: RootState) => state.ContentReducer.menuItems
	);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	// TODO: categoryNodes를 동적으로 만들도록 수정해야함.
	const categoryNodes = ["1", "2", "5"];
	const [expanded, setExpanded] = React.useState(categoryNodes);
	const [selected, setSelected] = React.useState([]);

	const handleToggle = (event, nodeIds) => {
		setExpanded(nodeIds);
	};

	const handleSelect = (event: React.MouseEvent, nodeIds: any) => {
		setSelected(nodeIds);
		const selectedItemId = nodeIds[0];
		const folderName = event.currentTarget.textContent; // target 으로 할 시 에러
		if (!categoryNodes.includes(selectedItemId))
			navigate(`/content/${folderName}`);
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
				{items && RecursiveTreeViewWrapper(items, items)}
			</TreeView>
		</Box>
	);
}
