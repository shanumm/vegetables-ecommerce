import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { storage, db } from "../../firebase";
import "./admin.css";
import IndividualOrder from "../IndividualOrder/IndividualOrder";
import { useStateValue } from "../Stateprovider/Stateprovider";

export default function Admin() {
  const [{ basket, user }, dispatch] = useStateValue();

  const history = useNavigate();
  const [allOrders, setallOrders] = useState([]);
  const [couponName, setCouponName] = useState("");
  const [couponPrice, setCouponPrice] = useState(0);
  const [succes, setsuccess] = useState("");
  const [couponEligibility, setcouponEligibility] = useState(0);
  var all = 0;

  // const num = async () => {
  //   const data = await db
  //     .collection("allorders")
  //     .get()
  //     .then((snapshot) => {
  //       snapshot.docs.forEach((doc) => {
  //         setallOrders(doc.data());
  //       });
  //     });
  //   console.log(allOrders);
  // };

  // useEffect(() => {
  //   num();
  // }, []);

  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    const products = await db
      .collection("allorders")
      .orderBy("created", "desc")
      .get();
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

  const setCouponFunction = (e) => {
    e.preventDefault();
    if (couponName != "" && couponPrice != 0) {
      console.log(
        "coupon name >>>>>" + couponName + "\ncoupon price >>>>>" + couponPrice
      );
      db.collection("Coupon")
        .doc("coupon")
        .set({
          couponName: couponName,
          couponPrice: couponPrice,
          couponEligibility: Number(couponEligibility),
        })
        .then(() => {
          setsuccess("Coupon added Successfully");
          setCouponName("");
          setCouponPrice(0);
          setcouponEligibility(0);
          setTimeout(() => {
            setsuccess("");
          }, 3000);
        });
    } else {
      alert("coupon empty");
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      {user && user.email === "adminxya@gmail.com" ? (
        <div className="Admin">
          <div className="setcoupon">
            <h1>Set Coupon</h1>
            <form onSubmit={setCouponFunction}>
              <label>Set coupon name</label>
              <input
                type="text"
                onChange={(e) => setCouponName(e.target.value)}
              />
              <label>Set coupon Price</label>
              <input
                type="number"
                onChange={(e) => setCouponPrice(e.target.value)}
              />
              <label>
                Coupon eligibility (100 for offer on more than 100Rs)
              </label>
              <input
                type="number"
                onChange={(e) => setcouponEligibility(e.target.value)}
              />
              <button>Set Coupon</button>
            </form>
            {succes && <h3> {succes}</h3>}
          </div>
          <h1>All Orders</h1>

          {products.length > 0 && <IndividualOrder products={products} />}
        </div>
      ) : (
        history("/")
      )}
    </>
  );
}
