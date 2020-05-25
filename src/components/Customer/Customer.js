import React from 'react';
import Styles from '../Customer/Customer.module.css';

const Customer = (props) => {

  return(
    <div className={Styles.Customer}>
        <h2 className={Styles.Name}>{props.name}</h2>
        <h4 className={Styles.Institute}>{props.institute}</h4>
        <button className={Styles.button}><span>Next </span></button>
    </div>
  );
};

export default Customer;