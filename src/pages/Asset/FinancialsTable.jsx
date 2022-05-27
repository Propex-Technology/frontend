import { useState, useEffect } from 'react';
import {
  Button, Table, TableHead, TableRow, TableCell, TableBody, TableContainer,
} from '@mui/material';

export function FinancialsTable(props) {
  let fakeFinancialData = {
    'Token Breakdown': {
      'Token Stake Price': '$100',
      'Also Awesome': '$150'
    },
    'Expenditure': {
      'Token Stake Price': '$100',
      'Also Awesome': '$150'
    },
    'Rental Income': {
      'Token Stake Price': '$100',
      'Also Awesome': '$150'
    }
  };
  fakeFinancialData = props.financials;
  const tableNames = Object.keys(fakeFinancialData);

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
            {Object.entries(fakeFinancialData[t]).map((row, i) => <TableRow
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
