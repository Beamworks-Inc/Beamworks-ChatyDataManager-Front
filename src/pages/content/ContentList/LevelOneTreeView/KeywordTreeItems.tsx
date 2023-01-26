import { TreeItem } from "@mui/lab";
import { KeywordDto } from "interfaces/Content.interface";

const KeywordTreeItems = ({ items }: { items: KeywordDto[] }) => {
	return items.map((item, idx) => (
		<TreeItem key={idx + 1} nodeId={String(idx + 1)} label={item.name} />
	));
};

export default KeywordTreeItems;
