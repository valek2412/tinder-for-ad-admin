import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from "@material-ui/core/styles";
import axios from "axios";
import {serverUrl} from "../config";

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

  const [selectedFile, setSelectedFile] = useState();
  const [isSelected, setIsSelected] = useState(false);
  const [title, setTitle] = useState('');
  const [cost, setCost] = useState('');

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsSelected(true);
  };

  const handleSubmission = () => {
    const formData = new FormData();

    formData.append('title', title);
    formData.append('cost', cost);
    formData.append('image', selectedFile);

    fetch(
      `${serverUrl}/prizes`,
      {
        method: 'POST',
        body: formData,
      }
    )
      .then((response) => response.json())
      .then((result) => {
        console.log('Success:', result);
        onClose();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <form noValidate autoComplete='off'>
      <div className={classes.field}>
        <TextField
          required
          id="standard-required"
          label="Название"
          value={title}
          onChange={(e) => setTitle(e.target.value)}/>
      </div>
      <div className={classes.field}>
        <TextField
          required
          id="standard-required"
          label="Стоимость"
          value={cost}
          onChange={(e) => setCost(e.target.value)}/>
      </div>
      <div className={classes.field}>
        <input
          accept="image/*"
          id="contained-button-file"
          multiple
          type="file"
          onChange={changeHandler}
          className={classes.input}
        />
        <label htmlFor="contained-button-file">
          <Button variant="contained" color="primary" component="span">
            Загрузить изображение
          </Button>
          {isSelected ? (<div>Выбран файл: {selectedFile["name"]}</div>) : (<div>Файл не выбран</div>)}
        </label>
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