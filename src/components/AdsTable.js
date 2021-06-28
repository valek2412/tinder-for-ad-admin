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
import CreateAdForm from "./CreateAdForm";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  img: {
    height: 150,
    width: 150,
  }
});

const AdsTable = () => {
  const classes = useStyles();

  const [ads, setAds] = useState([]);
  const [isDialogOpen, setDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const handleDelete = async (id) => {
    setIsLoading(true);
    await axios.delete(`http://localhost:5000/ads/${id}`);
    setIsLoading(false);
  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`http://localhost:5000/ads`);
      setAds(result.data);
    }
    fetchData();
  }, [isDialogOpen, ads.length, isLoading]);

  return (
    <>
    <TableContainer component={Paper}>
      <Table className={classes.table} size='small' aria-label="Ads Table">
        <TableHead>
          <TableRow>
            <TableCell>Название</TableCell>
            <TableCell>Описание</TableCell>
            <TableCell>Картинка</TableCell>
            <TableCell>Статистика</TableCell>
            <TableCell>Всего постов: {ads.length}</TableCell>
            <TableCell>
              <Button variant='contained' color='primary' onClick={handleClickOpen}>Добавить</Button>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ads.map(row => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.content}
              </TableCell>
              <TableCell component="th" scope="row">
                <img className={classes.img} src={`http://localhost:5000/${row.image}`} alt=''/>
              </TableCell>
              <TableCell component="th" scope="row">
                <div>Просмотры: {row.views}</div>
                <div>Лайки:{row.likesCount}</div>
                <div>Дизлайки: {row.dislikesCount}</div>
                <div>Избранное: {row.favouritesCount}</div>
              </TableCell>
              <TableCell></TableCell>
              <TableCell component="th" scope="row">
                <Button size='small' color='secondary' onClick={() => handleDelete(row.id)}>Удалить</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  <Dialog open={isDialogOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
    <DialogTitle id="form-dialog-title">Добавить рекламу</DialogTitle>
    <DialogContent>
      <CreateAdForm onClose={handleClose} />
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

export default AdsTable;