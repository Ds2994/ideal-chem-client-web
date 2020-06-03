import React, { useState, useEffect } from 'react';

import Styles from './Product.module.css';
import { SRL, SPECTROCHEM } from '../../utils/Images/Images';

const SelectedProduct = (props) => {
  const [company, setComapny] = useState("");

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

  const handleSubstractAction = () => {
    props.reduce(props.product.id);
  }

  const handleAddAction = () => {
    props.add(props.product.id);
  }

  const handleRemoveButton = () => {
    props.onRemove(props.product.id)
  }

  return(
    <div className={Styles.card}>
      <div className={Styles.box1}>
        <img className={Styles.image} src={company} alt="Image"/>
      </div>

      <div className={Styles.price}>
        ₹ {props.product.price}
      </div>

      <div className={Styles.unit2}>
        <img className={Styles.minus} src="https://image.flaticon.com/icons/svg/25/25434.svg" onClick={handleSubstractAction}/>
        {props.product.unit}
        <img className={Styles.add} src="https://cdn4.iconfinder.com/data/icons/basic-for-user-interface-vol-1/24/add-_plus-_create_-square-_Add_Button-512.png" onClick={handleAddAction}/>
      </div>

      <div className={Styles.name}>
        {props.product.productName}
      </div>

      <div className={Styles.cas}>
        {props.product.casNumber}
      </div>

      <div className={Styles.size}>
        {props.product.size}
      </div>

      <div className={Styles.box4}>
        <button className={Styles.button2} onClick={handleRemoveButton}><span>Remove</span></button>
      </div>
      
    </div>
  );
};

export default SelectedProduct;