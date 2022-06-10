import React, { useEffect, useState } from "react";
import ShopComponent from "./ShopComponent.js";
import { motion } from "framer-motion";
import Tomato from "../../Images/tomato.png";
import "./shop.css";
import { db } from "../../firebase.js";

import AllshopProducts from "./AllshopProducts.js";
export default function Shop() {
  const [category, setcategory] = useState("New Vegetables");
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    var products = await db.collection("New Vegetables").get();
    if (category == "vegetables") {
      products = await db.collection("New Vegetables").get();
    }
    if (category == "fruits") {
      products = await db.collection("Fruits").get();
    }
    if (category == "seasonal") {
      products = await db.collection("On Demand or Seasonal").get();
    }

    const productArray = [];
    for (var snap of products.docs) {
      var data = snap.data();
      data.ID = snap.id;
      productArray.push({
        ...data,
      });
      if (productArray.length === products.docs.length) {
        setProducts(productArray);
      }
    }
  };

  useEffect(() => {
    getProducts();
  }, [category]);


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="shop"
    >
      <div className="shop-main"></div>

      <div className="shop-content">
        <div>
          <div className="shop-content-left-lower">
            <h2>Category</h2>
            <div>
              <button onClick={() => setcategory("vegetables")}>
                Fresh Vegetables
              </button>
              <button onClick={() => setcategory("seasonal")}>
                Herbs And Seasonals
              </button>
              <button onClick={() => setcategory("fruits")}>Fruits</button>
              <button onClick={() => setcategory("spices")}>Spices</button>
              <button onClick={() => setcategory("dairy")}>Dairy</button>
            </div>
          </div>
        </div>
        <div>
          <div className="shop-component-cards">
            {products.length > 0 && <AllshopProducts products={products} />}
            {products.length < 1 && <>Please wait....</>}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
