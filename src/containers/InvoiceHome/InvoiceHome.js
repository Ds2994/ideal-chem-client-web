import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Appbar from '../../components/Appbar/Appbar';

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(1),
  },  
}));

const InvoiceHome = () => {
  const classes = useStyles();

  return(
    <div>
      <Appbar title="INVOICE HOME" />
    </div>
  );
}

export default InvoiceHome;