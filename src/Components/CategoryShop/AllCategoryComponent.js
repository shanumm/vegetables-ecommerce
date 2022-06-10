import React, { useState, useEffect } from "react";
import IndividualCategoryComponent from "./IndividualCategoryComponent";
import "./allcategory.css";

export default function AllCategoryComponent({
  products,
  discount,
  multiplevege,
  settingSearchItemrouter,
}) {
  const [searchterm, setsearchterm] = useState("");

  return (
    <div className="allcategory">
      <label>Search</label>
      <input
        className="allcategorysearch"
        type="text"
        placeholder="Search..."
        onChange={(e) => setsearchterm(e.target.value)}
      />
      <div>
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
            <IndividualCategoryComponent
              discount={discount}
              key={product.id}
              product={product}
            />
          ))}
      </div>
    </div>
  );
}
