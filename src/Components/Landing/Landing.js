import React, { useEffect } from "react";
import Header from "../Header/Header";
import Home from "../Slider/Home";
import Intro from "../Intro/Intro";
import Products from "../Products/Products";
import Whychooseus from "../WhyChooseUs/Whychooseus";
import Footer from "../Footer/Footer";
import AboutUs from "../AboutUs/AboutUs";
import { db } from "../../firebase";
import Card from "../Card/Card";
import "./Landing.css";
import { Link } from "react-router-dom";
var stringg = "New Vegetables";
export default function Landing() {
  // let number = 0;

  // useEffect(() => {
  //   // getNumber();
  //   const num = db
  //     .collection("NumberOfOrders")
  //     .get()
  //     .then((snapshot) => {
  //       snapshot.forEach((doc) => {
  //         const data = doc.data();
  //         number = data.number;
  //         db.collection("NumberOfOrders")
  //           .doc("number")
  //           .set({
  //             number: number + 1,
  //           });
  //       });
  //     });
  // }, []);
  return (
    <div>
      <Home />
      <h1>Popular Categories</h1>
      <div className="category-card">
        <Link to="/CategoryShop" onClick={() => (stringg = "Fruits")}>
          <Card
            a="Fruits"
            image="https://cdn.pixabay.com/photo/2015/12/30/11/57/fruits-1114060_960_720.jpg"
          />
        </Link>
        <Link to="/CategoryShop" onClick={() => (stringg = "New Vegetables")}>
          <Card
            a="Vegetables"
            image="https://cdn.pixabay.com/photo/2016/03/05/19/02/vegetables-1238252_960_720.jpg"
          />
        </Link>
        {/* <Link to="/CategoryShop" onClick={() => (stringg = "Dry Fruits")}>
          <Card
            a="Dry Fruits"
            image="https://cdn.pixabay.com/photo/2016/09/12/20/56/dried-fruit-1665744_960_720.jpg"
          />
        </Link> */}
        <Link to="/CategoryShop" onClick={() => (stringg = "Dairy Products")}>
          <Card
            a="Dairy"
            image="https://cdn.pixabay.com/photo/2017/07/05/15/41/milk-2474993_960_720.jpg"
          />
        </Link>
        <Link to="/CategoryShop" onClick={() => (stringg = "Catch Spices")}>
          <Card
            a="Spices"
            image="https://cdn.pixabay.com/photo/2018/06/10/17/39/market-3466906_960_720.jpg"
          />
        </Link>
      </div>
      <Products />
    </div>
  );
}

export { stringg };
