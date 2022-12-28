import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  IRationaleDescription,
  IReference,
} from "interfaces/Content.interface";

export default function BasicTable(props: {
  rows: IReference[] | IRationaleDescription[];
}) {
  const { rows } = props;

  return (
    <TableContainer sx={{ borderRadius: "10px" }} component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead sx={{ backgroundColor: "#efefef" }}>
          <TableRow>
            {rows.length > 0 &&
              rows[0] &&
              Object.keys(rows[0]).map((key) => <TableCell>{key}</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row: IReference | IRationaleDescription, idx: number) => (
            <TableRow
              key={idx}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {Object.values(row).map((value) => (
                <TableCell>
                  {value instanceof URL ? value.toString() : value}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
