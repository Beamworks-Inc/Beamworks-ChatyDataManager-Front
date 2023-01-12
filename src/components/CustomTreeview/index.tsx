import React, { useEffect } from "react";
import { TreeItem, TreeView } from "@mui/lab";
import { Box, Button } from "@mui/material";

// modules
import { useNavigate, useParams } from "react-router-dom";
import { Treeitem, Folder } from "interfaces/Content.interface";
import EditModeComponent from "./EditModeComponent";
import NormalModeComponent from "./NormalModeComponent";

// redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { ContentAction } from "store/reducers/ContentReducer";

// icons
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

// apis
import FoldersAPI from "apis/folder";
import FolderAddButton from "./FolderAddButton";
import { AxiosError, AxiosResponse } from "axios";

const presetMenuitem = (root: Folder) => {
	let nodeId = 1;
	let category = [] as string[];
	const traverseFolder = (root: Folder, parentId: number | null) => {
		const newRoot = {
			...root,
			isEditMode: false,
			isCategory: false,
			parentId: parentId,
		} as Treeitem;
		if (newRoot.children.length > 0) {
			newRoot.isCategory = true;
			category.push(String(nodeId));
			newRoot.children = newRoot.children.map((child) => {
				nodeId += 1;
				return traverseFolder(child, newRoot.id);
			});
		}
		return newRoot;
	};
	const newRoot = traverseFolder(root, root.id);
	return { newRoot, category };
};

export default function CustomTreeview() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const items = useSelector(
		(state: RootState) => state.ContentReducer.menuItems
	);

	const [categoryNodes, setCategoryNodes] = React.useState([] as string[]);
	const [expanded, setExpanded] = React.useState([] as string[]);
	const [selected, setSelected] = React.useState([] as string[]);

	useEffect(() => {
		FoldersAPI.findAllRoot()
			.then((res: AxiosResponse) => {
				const [root] = res.data; // 가장 첫번재 루트만 받아온다.
				const { newRoot, category } = presetMenuitem(root);
				dispatch(ContentAction.setMenuItems(newRoot));
				setExpanded(category);
				setCategoryNodes(category);
			})
			.catch((err: AxiosError) => {
				alert(`find all root error, code:(${err.code})`);
			});
	}, []);

	const handleSelect = (event: React.SyntheticEvent, nodeIds: any) => {
		setSelected(nodeIds);
	};

	const handleToggle = (event: React.SyntheticEvent, nodeIds: string[]) => {
		setExpanded(nodeIds);
	};

	const handleExpandClick = () => {
		setExpanded((oldExpanded) =>
			oldExpanded.length === 0 ? categoryNodes : []
		);
	};

	const RecursiveTreeitems = (root: Treeitem, item: Treeitem) => {
		let nodeId = 1;
		const renderTree = (root: Treeitem, item: Treeitem) => {
			return (
				<div
					style={{
						display: "inline-block",
						width: "100%",
						position: "relative",
					}}
				>
					{item.isEditMode ? (
						<EditModeComponent root={root} item={item} />
					) : (
						<NormalModeComponent root={root} item={item} />
					)}
					<TreeItem
						onClick={(e: React.MouseEvent) => {
							e.stopPropagation();
							if (item.isCategory === false) navigate(`/content/${item.id}`);
						}}
						style={{ position: "relative" }}
						nodeId={nodeId.toString()}
						label={item.name}
					>
						{item.children.map((item) => {
							nodeId += 1;
							return renderTree(root, item);
						})}
					</TreeItem>
				</div>
			);
		};
		return renderTree(root, item);
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
				{items && (
					<Button onClick={handleExpandClick}>
						{expanded.length === 0 ? "Expand all" : "Collapse all"}
					</Button>
				)}
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
				{items ? RecursiveTreeitems(items, items) : <FolderAddButton />}
			</TreeView>
		</Box>
	);
}
