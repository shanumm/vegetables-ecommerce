import React from "react";
import "./order.css";
import moment from "moment";
import Checkout from "../Checkout/Checkout";
import CurrencyFormat from "react-currency-format";
import Basketproduct from "../BasketProduct/Basketproduct";
export default function Order({ order }) {
  return (
    <div className="order">
      <h2>Order</h2>
      <p>{order.data.created}</p>
      <p className="order_id">
        <small>{order.id}</small>
      </p>
      {order.data.basket?.map((item) => (
        <Basketproduct
          id={item.title}
          title={item.title}
          image={item.image}
          price={item.price}
          weight={item.weight}
          quantity={item.quantity}
          hideButton
        />
      ))}
      <div className="orderStatusSection">Status : {order.data.Status}</div>
      <CurrencyFormat
        renderText={(value) => (
          <h3 className="order_total">Order Total : {value}</h3>
        )}
        decimalScale={2}
        value={order.data.amount / 100}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"₹"}
      />
    </div>
  );
}
