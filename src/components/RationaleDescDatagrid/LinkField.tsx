import { Tooltip } from "@mui/material";
import { isURL } from "./util";

const CONST = {
	WARN_WRONG_LINK: "잘못된 링크 형식입니다.",
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
