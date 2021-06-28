import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from "@material-ui/core/styles";
import axios from "axios";

const useStyles = makeStyles({
  input: {
    display: 'none',
  },
  field: {
    paddingBottom: 5,
  }
});

const CreatePrizeForm = ( { onClose } ) => {
  const classes = useStyles();

  const [title, setTitle] = useState('');
  const [cost, setCost] = useState('');

  const handleSubmission = () => {
    axios.post('http://localhost:5000/prizes', { title, cost: parseInt(cost)})
      .then((res) => {
        console.log(res);
        onClose();
      }, (err) => { console.log(err)})
  };

  return (
    <form noValidate autoComplete='off'>
      <div className={classes.field}>
        <TextField
          required
          id="standard-required"
          label="Заголовок"
          value={title}
          onChange={(e) => setTitle(e.target.value)}/>
      </div>
      <div className={classes.field}>
        <TextField
          required
          id="standard-required"
          label="Описание"
          value={cost}
          onChange={(e) => setCost(e.target.value)}/>
      </div>
      <div>
        <Button variant="contained" color="primary" component="span" onClick={handleSubmission}>
          Добавить
        </Button>
      </div>
    </form>
  );
}

export default CreatePrizeForm;