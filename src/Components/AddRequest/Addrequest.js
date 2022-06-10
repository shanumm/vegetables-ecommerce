import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import "./addrequest.css"
import IndividualOrder from "../IndividualOrder/IndividualOrder";
import { useStateValue } from "../Stateprovider/Stateprovider";
import IndividualRequest from "./IndividualRequest";

export default function Addrequest() {
  const [{ basket, user }, dispatch] = useStateValue();
  const history = useNavigate();

  //   const [allorderRequest, setAllorderRequest] = useState([]);
  //   const productarray = [];
  //   const getRequest = async () => {
  //     const products = await db
  //       .collection("farmer-Products")
  //       .get()
  //       .then((snapshot) => {
  //         snapshot.docs.forEach((doc) => {
  //           productarray.push(doc.data());
  //         });
  //         setAllorderRequest(productarray);
  //       });
  //   };

  //   useEffect(() => {
  //     getRequest();
  //     console.log(allorderRequest);
  //   }, [user]);

  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    const products = await db.collection("farmer-Products").get();
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
    <>
      {user && user.email === "adminxya@gmail.com" ? (
        <div className="addrequest">
          <h3>All Request</h3>
          {products.length > 0 && <IndividualRequest products={products} />}
        </div>
      ) : (
        history("/")
      )}
    </>
  );
}
