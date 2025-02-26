"use client";
import { styled, TableRow } from "@mui/material";

const AlterTableRow = styled(TableRow)(() => ({
    '&:nth-of-type(odd)': {
        backgroundColor: "rgba(0, 0, 0, 0.050)",
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default AlterTableRow;