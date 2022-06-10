import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { useStateValue } from "../Stateprovider/Stateprovider";
import Order from "./Order";
import "./orders.css";
export default function Orders() {
  const [{ basket, user }, dispatch] = useStateValue();
  const [orders, setorders] = useState();

  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user?.uid)
        .collection("order")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) =>
          setorders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
    } else {
      setorders([]);
    }
  }, [user]);

  return (
    <div>
      <h1>Your orders</h1>
      <div className="orders_order">
        {orders?.map((order) => (
          <Order order={order} />
        ))}
      </div>
    </div>
  );
}
