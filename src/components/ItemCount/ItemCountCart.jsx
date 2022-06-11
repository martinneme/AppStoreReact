import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";

export default function ItemCountCart({ stock, initial,ClickToAddToCart }) {
  const [itemCount, SetItemCount] = useState(initial);
  const [noAvailableStock,SetNoAvailableStock] = useState(false);

  const delItem = () => {
    if (itemCount > 1) SetItemCount(itemCount - 1);
  };
  const addItem = () => {
    if (itemCount < stock) SetItemCount(itemCount + 1);
  };
  useEffect(()=>{
   stock < 1 && SetNoAvailableStock(true)
 },[stock])
  
  return (
    <>
      <div className="itemAddCard" style={{ display: noAvailableStock && "none" }} >
        <div className="itemPanelAdd">
          <Button className="details" onClick={delItem}>
            -
          </Button>
          <p className="itemCountValue">{itemCount}</p>
          <Button className="details" onClick={addItem}>
            +
          </Button>
        </div>
        <Button variant="primary addToCart" 
        
        onClick={()=>ClickToAddToCart(itemCount)} >Agregar al carrito</Button>
      </div>
      <Button className="noAvailable" style={{ display: !noAvailableStock && "none" }}>
      SIN STOCK
          </Button>
    </>
  );
}
