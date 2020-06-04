import React, { useState, useEffect } from 'react';
import Styles from './PriceRow.module.css';

const PriceRow = (props) => {
  const [name, setName] = useState("");
  const [rate, setRate] = useState(0.00);
  const [discount, setDiscount] = useState(0.00);

  useEffect(() => {
    setName(props.product.productName+ ',' +props.product.companyName+ '#' + props.product.code);
    setRate(parseFloat(props.product.price).toFixed(2));
    setDiscount(parseFloat(props.product.discount).toFixed(2));
  },[]);

  const nameChangedHandler = (event) => {
    setName(event.target.value);
    props.nameChangedHandler(event.target.value, props.product.id);
  };

  const rateChangedHandler = (event) => {
    var rate = parseFloat(event.target.value).toFixed(2);
    setRate(rate);
    props.rateChangedHandler(rate, props.product.id);
  };

  const discountChangedHandler = (event) => {
    var discount = parseFloat(event.target.value).toFixed(2);
    setDiscount(discount);
    props.discountChangedHandler(discount, props.product.id);
  };

  const cgstChangeHandler = (event) => {
    props.cgstChangeHandler(event.target.value, props.product.id);
  };

  const sgstChangeHandler = (event) => {
    props.sgstChangeHandler(event.target.value, props.product.id);
  };

  const igstChangeHandler = (event) => {
    props.igstChangeHandler(event.target.value, props.product.id);
  };
  
  return (
    <tr className={Styles.priceRowTR}>
      <th>{props.product.displayID}</th>
      <td className={Styles.PriceRowInput}>
        <input type="text" className={Styles.PriceRowInput}
          value={name}
          onChange={nameChangedHandler}/>
      </td>
      <td>{props.product.unit}</td>
      <td>
        <p className={Styles.uom}>
          {props.product.size}
        </p>
      </td>
      <td>
        <input type="number" className={Styles.RateRowInput}
          value={rate}
          onChange={rateChangedHandler}/>
      </td>
      <td>{props.product.total}</td>
      <td>
        <p className={Styles.disc}>
        <input type="number" className={Styles.DiscountRowInput}
          value={discount}
          onChange={discountChangedHandler}/>%
        </p>
      </td>
      <td>{props.product.discountAmt}</td>
      <td>{props.product.taxableAmt}</td>
      <td>
        <select className={Styles.SelectBox} onChange={cgstChangeHandler}>
          <option value="0.0">0.0%</option>
          <option value="2.5">2.5%</option>
          <option value="9.0">9.0%</option>
        </select>
      </td>
      <td>
        {parseFloat(props.product.cgstAmt).toFixed(2)}
      </td>
      <td>
        <select className={Styles.SelectBox} onChange={sgstChangeHandler}>
          <option value="0.0">0.0%</option>
          <option value="2.5">2.5%</option>
          <option value="9.0">9.0%</option>
        </select>
      </td>
      <td>
        {parseFloat(props.product.sgstAmt).toFixed(2)}
      </td>
      <td>
        <select className={Styles.SelectBox} onChange={igstChangeHandler}>
          <option value="0.0">0.0%</option>
          <option value="2.5">2.5%</option>
          <option value="9.0">9.0%</option>
        </select>
      </td>
      <td>
        {parseFloat(props.product.igstAmt).toFixed(2)}
      </td>
      <td>{props.product.totalAmt}</td>
    </tr>
  );
};

export default PriceRow