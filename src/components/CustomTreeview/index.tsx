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

const RecursiveTreeitem = (root: Treeitem, item: Treeitem) => (
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
			style={{ position: "relative" }}
			nodeId={item.nodeId}
			label={item.name}
		>
			{item.children.map((item) => {
				return RecursiveTreeitem(root, item);
			})}
		</TreeItem>
	</div>
);

const presetMenuitem = (root: Folder) => {
	let nodeId = 1;
	let category = [] as string[];
	const traverseFolder = (root: Folder, parentId) => {
		const newRoot = {
			...root,
			isEditMode: false,
			isCategory: false,
			parentId: parentId,
			nodeId: nodeId.toString(),
		} as Treeitem;
		if (newRoot.children.length > 0) {
			newRoot.isCategory = true;
			category.push(newRoot.nodeId);
			newRoot.children = newRoot.children.map((child) => {
				nodeId += 1;
				return traverseFolder(child, newRoot.id);
			});
		}
		return newRoot;
	};
	const newRoot = traverseFolder(root, root.id);
	console.log(newRoot);
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
			.then((res) => {
				dispatch(ContentAction.setMenuItems(null));
				return;
				const [root] = res.data;
				const { newRoot, category } = presetMenuitem(root);
				dispatch(ContentAction.setMenuItems(newRoot));
				setExpanded(category);
				setCategoryNodes(category);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const handleSelect = (event: React.SyntheticEvent, nodeIds: any) => {
		setSelected(nodeIds);
		const selectedItemId = nodeIds[0];
		const folderName = event.currentTarget.textContent; // target 으로 할 시 에러
		if (!categoryNodes.includes(selectedItemId))
			navigate(`/content/${folderName}`);
	};

	const handleToggle = (event: React.SyntheticEvent, nodeIds: string[]) => {
		setExpanded(nodeIds);
	};

	const handleExpandClick = () => {
		setExpanded((oldExpanded) =>
			oldExpanded.length === 0 ? categoryNodes : []
		);
	};

	const handleClickAddFolder = () => {
		const folderName = prompt("enter folder name");
		const newFolder = {
			id: null,
			name: folderName,
			children: [],
		} as Folder;
		alert("add new folder!");
		// FoldersAPI.create(newFolder)
		// 	.then((res) => {
		// 		console.log(res);
		// 		dispatch(ContentAction.setMenuItems(res.data));
		// 	})
		// 	.catch((err) => {
		// 		console.log(err);
		// 	});
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
				{items ? (
					RecursiveTreeitem(items, items)
				) : (
					<div
						style={{ width: "100%", display: "flex", justifyContent: "center" }}
					>
						<Button
							sx={{ width: "80%" }}
							variant="contained"
							onClick={handleClickAddFolder}
						>
							add folder
						</Button>
					</div>
				)}
			</TreeView>
		</Box>
	);
}
