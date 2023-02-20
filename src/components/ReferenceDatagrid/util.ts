import { Reference } from "interfaces/Content.interface";

// from fetched data json format to data grid rows
export function rowConverter(rows: Reference[]): any[] {
	return rows.map((row, idx) => {
		return {
			id: idx + 1,
			title: row.title,
			description: row.description,
			link: row.link,
		};
	});
}

// from data grid row models to fetched data json format
export function rowInverter(rows: Map<any, any>): Reference[] {
	const arr = [] as Reference[];
	rows.forEach((row) => {
		const objectForReducer = {
			title: row.title,
			description: row.description,
			link: row.link,
		};
		arr.push(objectForReducer);
	});
	return arr;
}

export const isURL = (url: string) => {
	try {
		new URL(url);
		return true;
	} catch {
		return false;
	}
};
