import React from "react";
import { useStateValue } from "../Stateprovider/Stateprovider";
import "./basketproduct.css";
export default function Basketproduct({
  id,
  image,
  hideButton,
  title,
  price,
  weight,
  quantity,
}) {
  const [{ basket }, dispatch] = useStateValue();

  const removeFromBasket = () => {
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: id,
    });
  };

  return (
    <div className="basketProduct">
      <img className="basket_product_image" src={image} />
      <div className="basket_product_info">
        <p className="basket_product_title">{title}</p>
        <p className="basket_product_title">Weight: {weight}</p>
        <p>Quantity: {quantity}</p>
        <p className="basket_product_price">
          <small>₹</small>
          <strong>{price}</strong>
        </p>
        {!hideButton && (
          <button onClick={removeFromBasket}>Remove from Basket</button>
        )}
      </div>
    </div>
  );
}
