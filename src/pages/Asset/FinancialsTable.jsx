import { useState, useEffect } from 'react';
import {
  Button, Table, TableHead, TableRow, TableCell, TableBody, TableContainer,
} from '@mui/material';

export function FinancialsTable(props) {
  const financialData = props.financials;
  const tableNames = Object.keys(financialData);

  return (
    tableNames.map((t, i) =>
      <TableContainer key={i}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>{t}</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(financialData[t]).map((row, i) => <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }} key={i}
            >
              <TableCell component="th" scope="row">{row[0]}</TableCell>
              <TableCell align="right">{row[1]}</TableCell>
            </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    )
  );
}
