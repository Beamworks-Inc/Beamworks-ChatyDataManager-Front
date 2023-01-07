import { IRationaleDescription } from "interfaces/Content.interface";

// from fetched data json format to data grid rows
export function rowConverter(rows: IRationaleDescription[]): any[] {
  return rows.map((row, idx) => {
    return {
      id: idx + 1,
      description: row.description,
      link: row.link,
    };
  });
}

// from data grid row models to fetched data json format
export function rowInverter(rows: Map<any, any>): IRationaleDescription[] {
  const arr = [] as IRationaleDescription[];
  rows.forEach((row) => {
    const objectForReducer = {
      description: row.description,
      link: row.link,
    };
    arr.push(objectForReducer);
  });
  return arr;
}
