import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import Styles from './CustomerCreate.module.css';
import Backdrop from '@material-ui/core/Backdrop';
import TextField from '@material-ui/core/TextField';
import Appbar from '../../components/Appbar/Appbar';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SnackBar from '../../components/SnackBar/SnackBar';
import { postCustomer } from '../../utils/API/CustomerAPI';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(1),
    },

    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },  
}));

const CustomerCreate = () => {
  const classes = useStyles();
  const [name, setName] = useState(null);
  const [institute, setInstitute] = useState(null);
  const [error, setError] = useState(false);
  const [warning, setWarning] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  var errorPopUp = null;
  var warningPopUp = null;
  var successPopUp = null;

  //Validation Method
  const validateInput = (name, institute) => {
    if((name == null || name === "") 
      && (institute == null || institute === "")) {
        return false;
    } else {
      return true;
    }
  }

  const nameTextChange = (event) => {
    setName(event.target.value);
  }

  const instituteTextChange = (event) => {
    setInstitute(event.target.value);
  }

  const onClickHandler = () => {
    //setting default state
    setError(false);
    setLoading(true);
    setSuccess(false);
    setWarning(false);

    //Validating input field
    if(validateInput(name, institute)) {
      const data = {
        name: name,
        institute: institute
      };
      console.log(data);
      postCustomer(data,
        (response) => {
          setLoading(false);
          setSuccess(true);
          setMessage('Customer Created Successfully');
          console.log(response.data)},
        (err) => {
          setLoading(false);
          setError(true);
          setMessage('Customer Cannot be Created');
        });
    } else {
      setLoading(false);
      setMessage('Please Enter Customer Detail')
      setTimeout(() => {setWarning(true)}, 500);
    }
  }

  //Success Snackbar
  if(success) {
    successPopUp = <SnackBar
      type="success"
      message={message}
    />
  }

  //Warning Snackbar
  if(warning) {
    warningPopUp = <SnackBar
      type="warning"
      message={message}
    />
  }

  //Error Snackbar
  if(error) {
    errorPopUp = <SnackBar
      type="error"
      message={message}
    />
  }

  return (
    <div>
      <Appbar title="CREATE CUSTOMER" />

      <main className={classes.content}>
      <div className={classes.toolbar} />

        {errorPopUp}
        {warningPopUp}
        {successPopUp}

        <Backdrop className={classes.backdrop} open={isLoading}>
          <CircularProgress color="inherit" />
        </Backdrop>

        <div className={Styles.inputBox} >
          <TextField className={Styles.text} id="outlined-name" label="Name" size="small" variant="outlined" 
            onChange={nameTextChange}/><br/><br />
          <TextField className={Styles.text} id="outlined-institute" label="Institute" size="small" variant="outlined" 
            onChange={instituteTextChange}/><br/><br />
          <TextField className={Styles.text} id="outlined-phone" disabled={true} label="Phone" size="small" variant="outlined" /><br/><br />
        </div>
        <div className={Styles.buttonBox}>
        <Button
          variant="contained" color="primary" startIcon={<SaveIcon />} onClick={onClickHandler}>
          Save
        </Button>
        <br/>
        <br/>
        <Link to="/customer" style={{ textDecoration: 'none'}}>
        <Button
          variant="contained" color="secondary" startIcon={<ArrowBackIcon />} >
          Back
        </Button>
        </Link>
        </div>
      </main>      
    </div>
  );
}

export default CustomerCreate;