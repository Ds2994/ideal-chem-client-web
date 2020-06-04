import React from 'react';
import Styles from './InvoiceTable.module.css';

const InvoiceTable = (props) => {

  var tableData = null;

  //Format date to DD-MMM-YYYY ex. 10-APR-2009
  const dateFormatter = (date) => {
    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    return (date.getDate() + "-" + months[date.getMonth()] + "-" + date.getFullYear()); 
  };

  //Formats the status table to capsule designs
  const statusFormatter = (status) => {
    if(status === "Paid") {
      return <div className={Styles.paid}>Paid</div>;
    }

    if(status === "Sent") {
      return <div className={Styles.sent}>Sent</div>;
    }

    if(status === "Partialy Paid") {
      return <div className={Styles.partial}>Partialy Paid</div>;
    }
  };

  if(props.invoices.length > 0) {
    tableData = (props.invoices.map((invoice, index) => {
      return (
        <tr className={Styles.trInvHome} key={invoice.id}>
          <td>{invoice.id}</td>
          <td>{invoice.reference}</td>
          <td>{invoice.name}</td>
          <td>{dateFormatter(new Date(invoice.createDate))}</td>
          <td>{invoice.amount}</td>
          <td>{statusFormatter(invoice.state)}</td>
          <td></td>
        </tr>
      );
    }));
  };

  return (
    <div className={Styles.container}>
      <table className={Styles.invoiceTable}>
        <thead className={Styles.invoiceThead}>
          <tr className={Styles.trInvHome}>
            <th>#</th>
            <th>Invoice Number</th>
            <th>Customer Name</th>
            <th>Created Date</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className={Styles.invoiceTbody}>
          {tableData}
        </tbody>
      </table>
    </div>
  );
}

export default InvoiceTable;