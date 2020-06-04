import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import Styles from '../Appbar/Appbar.module.css';

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({

  appBarMain: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  // necessary for content to be below app bar
  toolBar: theme.mixins.toolbar,

}));

const Appbar = (props) => {
  const classes = useStyles();
  return (
    <AppBar position="fixed" className={classes.appBarMain}>
      <Toolbar>
        <div className={Styles.toolBarMain}>
          <h2>{props.title}</h2>
        </div>              
      </Toolbar>
    </AppBar>
  );
}

export default Appbar;