import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Appbar from '../../components/Appbar/Appbar';
import Styles from './InvoiceHome.module.css';
import AddIcon from '@material-ui/icons/Add';
import InvoiceTable from '../../components/InvoiceTable/InvoiceTable';
import { getLatestInvoices, getLatestInvoicesByDate } from '../../utils/API/InvoiceAPI';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

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
  const [invoiceList, setInvoiceList] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    getLatestInvoices( 
      (response) => {
        setInvoiceList(response.data);
        console.log(response.data)
      },
      (err) => {
        console.log('Error in fetching data');
      });
  },[]);

  const changeStartDate = (date) => {
    setStartDate(date);
  };

  const changeEndDate = (date) => {
    setEndDate(date);
  };

  const onSubmitHandler = () => {
    const sDate = startDate.getDate()+"/"+(startDate.getMonth()+1)+"/"+startDate.getFullYear();
    const eDate = endDate.getDate()+"/"+(endDate.getMonth()+1)+"/"+endDate.getFullYear();

    console.log(sDate);
    console.log(eDate);

    getLatestInvoicesByDate(sDate, eDate, 
      (response) => {
        setInvoiceList(response.data);
        console.log(response.data)
      },
      (err) => {
        setInvoiceList([]);
        console.log('Error in fetching data');
      });
  }

  return(
    <div>
      <Appbar title="INVOICE HOME" />

      <main className={classes.content}>
      
      <div className={Styles.header}>
        <div className={Styles.invoice}><h1>Invoices</h1></div>
        <div className={Styles.buttonAdd}>
        <Button
          variant="contained" color="primary" startIcon={<AddIcon />}>
          Create Invoice
        </Button>
        </div>
      </div>
      <div className={Styles.datePickers}>
        <div><h3>Start Date</h3> <DatePicker
          selected={startDate}
          onChange={changeStartDate}
        /></div>
        <div><h3>End Date</h3><DatePicker
          selected={endDate}
          onChange={changeEndDate}
        /></div>
        <div className={Styles.search}><Button
          variant="contained" color="primary" size="small" onClick={onSubmitHandler}>
          Search
        </Button></div>
      </div>
      <div>
        <InvoiceTable 
          invoices={invoiceList}/>
      </div>

      </main>
    </div>
  );
}

export default InvoiceHome;