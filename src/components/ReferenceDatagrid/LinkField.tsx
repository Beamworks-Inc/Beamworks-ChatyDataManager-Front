import { Tooltip } from "@mui/material";
import { isURL } from "./util";

const CONST = {
	WARN_WRONG_LINK: "링크가 잘못되었습니다. 링크를 그대로 붙여넣기 해주세요.",
};

export const LinkField = ({ link }: { link: string }) => {
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
