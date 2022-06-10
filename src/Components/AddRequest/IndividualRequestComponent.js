import React, { useState } from "react";
import { db } from "../../firebase";
import "./addrequestIndividual.css"

export default function IndividualRequestComponent({ product }) {
  const [requestAccepted, isrequestAccepted] = useState("");

  const handleDecision = (e) => {
    e.preventDefault();
    var decisionStatus = document.querySelector(".decisionStatus");
    if (decisionStatus.value == "accept") {
      isrequestAccepted("Request Updated");
      const updateDecision = db
        .collection("Products")
        .add({
          title: product.title,
          description: product.description,
          price: Number(product.price),
          url: product.url,
        })
        .then(() => {
          const updateDecision = db
            .collection("farmer-Products")
            .doc(product.ID)
            .delete();
        });
      // const updateDecision = db
      //   .collection("farmer-Products")
      //   .doc(product.ID)
      //   .delete();
    } else {
      isrequestAccepted("Request Updated");
      const updateDecision = db
        .collection("farmer-Products")
        .doc(product.ID)
        .delete();
    }
  };
  return (
    <div>
      <div className="individualorder">
        <div>Request Title : {product.title}</div>
        <div>Request Price : {product.price}</div>
        <div>Request Description : {product.description}</div>
        <div>Request User : {product.user}</div>
        <div>
          Request image :{" "}
          <img
            style={{ width: "15rem", objectFit: "contain" }}
            src={product.url}
            alt=""
          />
        </div>
        <form onSubmit={handleDecision}>
          <label> Decision </label>
          <select className="decisionStatus">
            <option value="accept">Accept</option>
            <option value="reject">Reject</option>
          </select>
          {requestAccepted.length > 0 ? (
            <button disabled type="submit">
              Update
            </button>
          ) : (
            <button type="submit">Update</button>
          )}
          <div style={{ color: "green" }}></div>
        </form>
        <h3>{requestAccepted}</h3>
      </div>
    </div>
  );
}
