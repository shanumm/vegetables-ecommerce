import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import "./individualorder.css";
export default function IndividualOrderComponent({ product }) {
  const [StatusUpdated, setStatusUpdated] = useState("");

  console.log(product.paymentId);
  const [handlecurrentStatus, setcurrentStatus] = useState("");

  const handleOrderStatus = (e) => {
    e.preventDefault();
    var orderstatusvalue = document.querySelector(".orderstatus");

    setStatusUpdated("Status Updated");
    const numb = db
      .collection("users")
      .doc(product.Userid)
      .collection("order")
      .doc(product.paymentId)
      .update({
        Status: orderstatusvalue.value,
      });
    const numb2 = db
      .collection("allorders")
      .doc("items" + (product.OrderNumber - 1))
      .update({
        Status: orderstatusvalue.value,
      });

    setTimeout(() => {
      setStatusUpdated("");
    }, 5000);
  };

  return (
    <div className="individualorder">
      <div>
        <div>Order Number :{" " + product.OrderNumber}</div>
      </div>
      <div>
        <div>User Id :</div> {product.Userid}
      </div>
      <div>
        <div>Payment Id :</div> {product.paymentId}
      </div>
      <div>
        <div>Amount Paid :</div> {product.amount / 100} ₹
      </div>
      <div>
        <div>Address : </div>
        {product.address}
      </div>
      <div>
        <div>Mobile : </div>
        {product.Mobile}
      </div>
      <div className="individualOrderItems">
        <h4>Items Ordered</h4>
        {product.basket.map((basket) => (
          <div>
            <div>{basket.title + " "}</div>
            {basket.price != "undefined" && (
              <div>{" " + basket.price + " "}</div>
            )}
            {basket?.weight != "undefined" && (
              <div>{" " + basket?.weight + " "}</div>
            )}

            <div>{" Quantity " + basket.quantity} </div>
          </div>
        ))}
      </div>
      <div className="updateStatusForm">
        <h4>Order Status (Current Status {product.Status})</h4>
        <form onSubmit={handleOrderStatus}>
          <label> Select Status </label>
          <select className="orderstatus">
            <option value="received">Received</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered"> delivered </option>
          </select>
          <button type="submit">Update</button>
          <div style={{ color: "green" }}>{StatusUpdated}</div>
        </form>
      </div>
    </div>
  );
}
