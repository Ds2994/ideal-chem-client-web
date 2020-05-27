import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Appbar from '../../components/Appbar/Appbar';
import Styles from '../../containers/CustomerHome/CustomerHome.module.css';
import { Link } from 'react-router-dom';
import Backdrop from '@material-ui/core/Backdrop';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SnackBar from '../../components/SnackBar/SnackBar';
import { getCustomers } from '../../utils/API/CustomerAPI';
import Customer from '../../components/Customer/Customer';

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    // necessary for content to be below app bar
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

const CustomerHome = () => {
    const classes = useStyles();
    const [isLoading, setLoading] = useState(false);
    const [name, setName] = useState(null);
    const [error, setError] = useState(false);
    const [warning, setWarning] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [customers, setCustomers] = useState([]);

    var errorPopUp = null;
    var warningPopUp = null;
    let customerList = null;

    //Validation Method
    const validateName = (name) => {
      if(name == null || name === "") {
        return false;
      } else {
        return true;
      }
    }

    const onSearchHandler = () => {
      //Base Setup for loading and error
      setLoading(true);
      setError(false);
      setWarning(false);
      setErrorMessage(null);
      setCustomers([]);

      //Validation method
      if(validateName(name)) {
        getCustomers(name, 
          (response) => {
            setLoading(false);
            setCustomers(response.data);
            console.log(response.data)},
          (err) => {
            setLoading(false);
            setError(true);
            setErrorMessage('Customer Not Found');
          });
      }else {
        setLoading(false);
        setErrorMessage('Please Enter Name')
        setTimeout(() => {setWarning(true)}, 500);
        
      }
    };

    if(customers.length > 0) {
      console.log('looping');
      customerList = (customers.map((customer, index) => {
        return (
            <Customer
              name={customer.name}
              institute={customer.institute}
              key={customer.id} />  
        )
      }));
    };

    const onChangeHandler = (event) => {
      setName(event.target.value);
    };

    if(warning) {
      console.log('warning setup');
      warningPopUp = <SnackBar
        type="warning"
        message={errorMessage}
      />
    }

    if(error) {
      console.log('error setup');
      errorPopUp = <SnackBar
        type="error"
        message={errorMessage}
      />
    }

    return (
        <div>
            <Appbar title="CUSTOMER SEARCH" />
            
            <main className={classes.content}>
            <div className={classes.toolbar} />

              {errorPopUp}
              {warningPopUp}

              <Backdrop className={classes.backdrop} open={isLoading}>
                  <CircularProgress color="inherit" />
              </Backdrop>
              
              <div className={Styles.marginTop}>

              <TextField
                key="TextField"
                id="outlined-basic" 
                label="Search" 
                variant="outlined"
                size="small"
                onChange={onChangeHandler}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton color="primary" onClick={onSearchHandler}>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  )
              }} className={Styles.searchBar} />

              </div>
              <div className={Styles.list}>
                {customerList}
              </div>
              <br/>
              <Link to="/customer/create" style={{ textDecoration: 'none'}}>
              <Button variant="contained" color="primary">
                Add New Customer
              </Button>
              </Link>
            </main>            
        </div>  
    )
};

export default CustomerHome;