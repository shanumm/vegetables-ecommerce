import React from "react";
import IndividualRequestComponent from "./IndividualRequestComponent";

export default function IndividualRequest({ products }) {
  return products.map((product) => (
    <IndividualRequestComponent key={product.id} product={product} />
  ));
}
