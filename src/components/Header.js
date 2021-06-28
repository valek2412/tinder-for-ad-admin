import React from "react";
import {AppBar, Toolbar, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {Link} from "react-router-dom";


const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  link: {
    textDecoration: "none",
    color: "white",
  },
});


const Header = () => {
const classes = useStyles();

  return(
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          <Link className={classes.link} to='/ads'>Реклама</Link>
        </Typography>
        <Typography variant="h6" className={classes.title}>
          <Link className={classes.link} to='/users'>Пользователи</Link>
        </Typography>
        <Typography variant="h6" className={classes.title}>
          <Link className={classes.link} to='/winners'>Победители</Link>
        </Typography>
        <Typography variant="h6" className={classes.title}>
          <Link className={classes.link} to='/prizes'>Призы</Link>
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Header;