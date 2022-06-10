import React from "react";
import Basketproduct from "../BasketProduct/Basketproduct";
import Header from "../Header/Header";
import { useStateValue } from "../Stateprovider/Stateprovider";
import "./checkout.css";
import Subtotal from "./Subtotal";
export default function Checkout() {
  const [{ basket, user }, dispatch] = useStateValue();

  return (
    <div className="checkout">
      <h3>Hello, {user?.email}</h3>
      <div className="checkout_title">
        <h2>Your Shopping Basket</h2>
      </div>
      <div className="checkoutBottom">
        <div className="checkout_left">
          <div className="checkoutBasketContainer">
            {basket.map((item) => (
              <Basketproduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                weight={item.weight}
                quantity={item.quantity}
              />
            ))}
          </div>
        </div>
        <div className="checkout_right">
          <Subtotal />
        </div>
      </div>
    </div>
  );
}
