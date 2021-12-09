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
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@material-ui/core";
import CreatePrizeForm from "./CreatePrizeForm";
import {serverUrl} from "../config";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  img: {
    height: 150,
    width: 150,
  }
});

const PrizesTable = () => {
  const classes = useStyles();

  const [prizes, setPrizes] = useState([]);
  const [isDialogOpen, setDialogOpen] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);

  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  // const handleDelete = async (id) => {
  //   setIsLoading(true);
  //   await axios.delete(`${serverUrl}/prizes/${id}`);
  //   setIsLoading(false);
  // }

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`${serverUrl}/prizes`);
      setPrizes(result.data);
    }
    fetchData().then();
  }, [isDialogOpen, prizes.length]);

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} size='small' aria-label="Ads Table">
          <TableHead>
            <TableRow>
              <TableCell>Название</TableCell>
              <TableCell>Изображение</TableCell>
              <TableCell>Стоимость</TableCell>
              <TableCell>Всего призов: {prizes.length}</TableCell>
              <TableCell>
                <Button
                  variant='contained'
                  color='primary'
                  onClick={handleClickOpen}>Добавить
                </Button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {prizes.map(row => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.title}
                </TableCell>
                <TableCell component="th" scope="row">
                  <img className={classes.img} src={`${serverUrl}/${row.image}`} alt=''/>
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.cost}
                </TableCell>
                <TableCell />
                <TableCell component="th" scope="row">
                  {/*<Button size='small' color='secondary' onClick={() => handleDelete(row.id)}>Удалить</Button>*/}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={isDialogOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Добавить приз</DialogTitle>
        <DialogContent>
          <CreatePrizeForm onClose={handleClose} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Отмена
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default PrizesTable;