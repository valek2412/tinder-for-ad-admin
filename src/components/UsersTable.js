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

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`${serverUrl}/users`);
      setUsers(result.data);
    }
    fetchData().then();
  }, [users.length]);


  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size='small' aria-label="Ads Table">
        <TableHead>
          <TableRow>
            <TableCell>Имя Фамилия</TableCell>
            <TableCell>Номер телефона</TableCell>
            <TableCell>Количество баллов</TableCell>
            <TableCell>Всего пользователей: {users.length}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map(row => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.name} {row["surname"]}
              </TableCell>
              <TableCell component="th" scope="row">
                {row["phoneNumber"]}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.points}
              </TableCell>
              <TableCell />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
