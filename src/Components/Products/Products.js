import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Product from "../Product/Product";
import Tomato from "../../Images/tomato.png";
import "./Products.css";
import { db } from "../../firebase";
import AllProducts from "./AllProducts";
export default function Products() {
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    const products = await db.collection("Products").get();
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
  }, []);

  return (
    <div className="product_sections">
      <div className="product_header">
        <h1>Featured Products</h1>
        <h3>Fresh From Our Farm</h3>
      </div>
      <div className="product_content">
        {products.length > 0  && <AllProducts products={products} />}
        {products.length < 1 && <>Please wait....</>}
        {/* <Product id="1" title="tomato" image={Tomato} price={10} />
        <Product id="2" title="tomato" image={Tomato} price={10} />
        <Product id="3" title="tomato" image={Tomato} price={10} />
        <Product id="4" title="tomato" image={Tomato} price={10} />
        <Product id="5" title="tomato" image={Tomato} price={10} />
        <Product id="6" title="tomato" image={Tomato} price={10} /> */}
      </div>
      <Link to="/shop">
        <button className="showMoreButton">Show More</button>
      </Link>
    </div>
  );
}
