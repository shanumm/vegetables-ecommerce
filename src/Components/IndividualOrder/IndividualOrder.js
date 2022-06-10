import React from "react";
import IndividualOrderComponent from "./IndividualOrderComponent";

export default function IndividualOrder({ products }) {
  return products.map((product) => (
    <IndividualOrderComponent key={product.id} product={product} />
  ));
}
