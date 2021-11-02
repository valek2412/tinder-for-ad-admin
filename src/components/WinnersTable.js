import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from "axios";
import {serverUrl} from "../config";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default () => {
  const classes = useStyles();

  const [prizes, setPrizes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`${serverUrl}/prizes`);
      setPrizes(result.data);
    }
    fetchData();
  }, {});

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size='small' aria-label="Ads Table">
        <TableHead>
          <TableRow>
            <TableCell>Призы</TableCell>
            <TableCell>Победители</TableCell>
            <TableCell>Контакты</TableCell>
            <TableCell>Всего победителей: {prizes.reduce((acc, item) => acc + item.winners.length, 0)}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {prizes.map(row => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.winners.map((item) => <div>{item.name} {item.surname}</div>)}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.winners.map((item) => <div>{item.phoneNumber}</div>)}
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}