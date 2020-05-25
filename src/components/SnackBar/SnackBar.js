import React, { useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
  return <MuiAlert elevation={10} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {  
    marginLeft: '100px',
    marginTop: '48px',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const SnackBar = (props) => {
  const classes = useStyles();
  const[open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  }

  return (<div>
            <Snackbar className={classes.root}
              anchorOrigin={ {vertical: 'top', horizontal: 'center'} } 
              open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity={props.type}>
                {props.message}
              </Alert>
            </Snackbar>
          </div>);
}

export default SnackBar;