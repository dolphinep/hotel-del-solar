import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import LOGO from './LOGO.png'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ backgroundColor: '#0A2759'}}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>            
            <img src={LOGO} alt='LOGO' width="215" height="70"></img>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}