import React from "react";
import { TreeItem, TreeView } from "@mui/lab";
import { Box, Button } from "@mui/material";

// modules
import { useNavigate, useParams } from "react-router-dom";

// icons
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Folder } from "interfaces/Content.interface";

/**
 * 이 함수는 재귀적으로 TreeItem을 만들어주는 함수입니다.
 * TreeItem의 nodeId로는 순차적으로 증가하는 count를 사용하기 때문에, count를 Wrapper함수의 지역변수로 선언해줍니다.
 * Wrapper가 없다면?(count를 해당 파일의 전역변수로 선언하는경우) : count가 계속 증가하면서, 새로고침할때마다 TreeItem의 nodeId가 누적되어 오류가 발생.
 * @param items
 */
const traverseItemsWrapper = (items: Folder) => {
  let count = 0;
  const traverseItems = (items: Folder[]) => {
    return items.map((item) => {
      count += 1;
      return (
        <TreeItem
          key={count.toString()}
          nodeId={count.toString()}
          label={item.name}
        >
          {traverseItems(item.children)}
        </TreeItem>
      );
    });
  };
  return traverseItems(items.children); // children of root!
};

export default function CustomTreeview(props: any) {
  const { items } = props;

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
        {items && traverseItemsWrapper(items)}
      </TreeView>
    </Box>
  );
}
