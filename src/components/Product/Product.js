import React, { useState, useEffect } from 'react';
import Styles from './Product.module.css';
import { SRL, SPECTROCHEM } from '../../utils/Images/Images';

const Product = (props) => {

  var packing = null;
  const [price, setPrice] = useState(props.product.priceDetails[0].price);
  const [qty, setQty] = useState(props.product.priceDetails[0].quantity);
  const [unit, setUnit] = useState(0);
  const [id, setId] = useState(props.product.priceDetails[0].id);
  const [size, setSize] = useState(props.product.priceDetails[0].size);
  const [company, setComapny] = useState("");

  if(props.product.priceDetails.length > 0) {
    packing = (props.product.priceDetails.map((pack, index) => {
      return (<option 
        value={pack.size}
        key={index}>
          {pack.size}
        </option>);
    }));
  };

  const onChangeHandler = (event) => {
    const indexFetcher = (detail) => detail.size === event.target.value;
    var index = props.product.priceDetails.findIndex(indexFetcher);

    setSize(props.product.priceDetails[index].size);
    setPrice(props.product.priceDetails[index].price);
    setQty(props.product.priceDetails[index].quantity);
    setId(props.product.priceDetails[index].id);
    setUnit(null);
  };

  const onInputHandler = (event) => {
    setUnit(event.target.value);
  };

  useEffect(() => {
    setComapny(getImageUrl());
  },[]);

  const getImageUrl = () => {
    if(props.product.comapanyName === "SRL") {
      return SRL;
    }
    if(props.product.comapanyName === "Spectrochem") {
      return SPECTROCHEM;
    }
  };

  const onClickHandler = () => {
    const selectedProduct = {
      displayID: 0,
      id: id,
      code: props.product.code,
      casNumber: props.product.casNumber,
      productName: props.product.productName,
      companyName: props.product.comapanyName,
      price: price,
      size: size,
      unit: unit,
      total: 0,
      discountAmt: 0,
      taxableAmt: 0,
      discount: 0.00,
      cgst: 0.00,
      cgstAmt: 0.00,
      sgst: 0.00,
      sgstAmt: 0.00,
      igst: 0.00,
      igstAmt: 0.00,
      totalAmt: 0.00
    };

    console.log(selectedProduct);
    props.onAdd(selectedProduct);
  } 

  return(
    <div className={Styles.card}>
      <div className={Styles.box1}>
        <img className={Styles.image} src={company} alt="Image"/>
      </div>

      <div className={Styles.price}>
        ₹ {price}
      </div>

      <div className={Styles.unit}>
        {qty} unit
      </div>

      <div className={Styles.name}>
        {props.product.productName}
      </div>

      <div className={Styles.cas}>
        {props.product.casNumber}
      </div>

      <div className={Styles.select}>
        <select className={Styles.PackSize} id="size" onChange={onChangeHandler}>
          {packing}
        </select>
      </div>

      <div className={Styles.box4}>
        <input className={Styles.input} type="number" onChange={onInputHandler}></input>
        <button className={Styles.button} onClick={onClickHandler}><span>Add </span></button>
      </div>
      
    </div>
  );
};

export default Product;