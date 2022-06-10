import React from "react";
import Product from "../Product/Product";

export default function AllProducts({ products }) {


  return products
    .slice(0, 6)
    .map((product) => <Product key={product.id} product={product} />);
}
