import React, { useState } from "react";
import ShopComponent from "./ShopComponent";
import "./allshop.css";
export default function AllshopProducts({ products }) {
  const [searchterm, setsearchterm] = useState("");

  return (
    <div className="allshopcontainer">
      <label>Search</label>
      <input
        className="allcategorysearch"
        type="text"
        placeholder="Search..."
        onChange={(e) => setsearchterm(e.target.value)}
      />
      <div className="allshop">
        {products
          .filter((product) => {
            if (searchterm == "") {
              return product;
            } else if (
              product?.title.toLowerCase().includes(searchterm.toLowerCase())
            ) {
              return product;
            }
          })
          .map((product) => (
            <ShopComponent key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
}
