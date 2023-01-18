import { Content, ContentForGrid } from "interfaces/Content.interface";

export function fromContentToRow(contents: Content[]): ContentForGrid[] {
	return contents.map((content) => {
		return {
			id: content?.id || "No data",
			question: content?.question || "No data",
			answer: content?.answer || "No data",
			reference: content?.reference[0]?.title || "No data",
			referenceLink: content?.reference[0]?.link?.toString() || "",
			rationale: content?.rationale?.description[0]?.description || "No data",
			rationaleLink: content?.rationale?.description[0].link?.toString() || "",
			writer: content?.writer?.name || "No data",
			writeDate: content?.writeDate?.toString() || "No data",
			reviewer: content?.review?.reviewer?.name || "No data",
			reviewDate: content?.review?.reviewDate?.toString() || "No data",
			status: content?.status || "No data",
		};
	});
}
