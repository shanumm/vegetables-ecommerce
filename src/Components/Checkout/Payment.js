import React, { useEffect, useState } from "react";
import "./Payment.css";
import { useStateValue } from "../Stateprovider/Stateprovider";
import BasketProduct from "../BasketProduct/Basketproduct";
import { Link, useNavigate } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "../Stateprovider/reducer";
import axios from "../../axios";
import { db } from "../../firebase";

export default function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();

  const history = useNavigate();
  let number = 0;
  const stripe = useStripe();
  const elements = useElements();
  const [error, seterror] = useState(null);
  const [disabled, setdisabled] = useState(null);
  const [succeeded, setsucceeded] = useState(false);
  const [processing, setprocessing] = useState("");
  const [clientSecret, setclientSecret] = useState(true);

  const [handleaddress, sethandleaddress] = useState(false);
  const [AddressSaved, setAddressSaved] = useState("");
  const [house, setHouse] = useState("");
  const [area, setarea] = useState("");
  const [city, setCity] = useState("");
  const [state, setstate] = useState("");
  const [pincode, setpincode] = useState();
  const [mobile, setmobile] = useState();
  const [coupon, setCoupon] = useState("");
  const [couponprice, setcouponprice] = useState(0);
  const [firebaseCouponName, setFirebaseCouponName] = useState("");
  const [firebseCouponPrice, setFirebseCouponPrice] = useState();
  const [firebaseCouponEligibility, setFirebaseCouponEligibility] = useState();

  const getLatestCoupon = async () => {
    const dataa = await db.collection("Coupon").doc("coupon").get();
    setFirebaseCouponName(dataa.data().couponName);
    setFirebseCouponPrice(dataa.data().couponPrice);
    setFirebaseCouponEligibility(dataa.data().couponEligibility);
  };

  var today = new Date();

  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  useEffect(() => {
    getLatestCoupon();
  }, []);

  useEffect(() => {
    const getclientSecret = async () => {
      const response = await axios({
        method: "post",
        url: `payments/create?total=${
          (getBasketTotal(basket) - couponprice) * 100
        }`,
      });
      setclientSecret(response.data.clientSecret);
      console.log("client secret >>>>>> " + clientSecret);
    };
    getclientSecret();
  }, [basket, couponprice]);

  useEffect(() => {
    const neworderform = document.querySelector(".paymentNewOrder");
    const neworderInput = document.querySelector(".paymentNewOrder > input");
    neworderInput.value = "new order recieved";
  }, []);

  const handleSubmit = async (e) => {
    const neworderform = document.querySelector(".paymentNewOrder");
    const neworderInput = document.querySelector(".paymentNewOrder > input");
    neworderInput.value = "new order recieved";

    e.preventDefault();
    if (handleaddress) {
      setprocessing(true);
      const payload = await stripe
        .confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        })
        .then(({ paymentIntent }) => {
          db.collection("users")
            .doc(user?.uid)
            .collection("order")
            .doc(paymentIntent.id)
            .set({
              basket: basket,
              amount: paymentIntent.amount,
              created: paymentIntent.created,
              address:
                house + " " + area + " " + city + " " + state + " " + pincode,
              Status: "Received",
            });

          db.collection("NumberOfOrders")
            .get()
            .then((snapshot) => {
              snapshot.forEach((doc) => {
                const data = doc.data();
                number = data.number;
                number = number + 1;
                db.collection("NumberOfOrders").doc("number").set({
                  number: number,
                });
                db.collection("allorders")
                  .doc("items" + number++)
                  .set({
                    basket: basket,
                    Userid: user.uid,
                    amount: paymentIntent.amount,
                    created: paymentIntent.created,
                    paymentId: paymentIntent.id,
                    address: house + area + city + state + pincode,
                    Status: "Received",
                    OrderNumber: number,
                    Mobile: mobile,
                  });
              });
            });
          neworderform.submit();
          setsucceeded(true);
          seterror(null);
          setprocessing(false);
          sethandleaddress(false);
          history("/orders");
        });
    } else {
      alert("fill the address");
    }
  };

  const handleCOD = async () => {
    const neworderform = document.querySelector(".paymentNewOrder");
    const neworderInput = document.querySelector(".paymentNewOrder > input");
    neworderInput.value = "new order recieved";

    if (handleaddress) {
      const data = await db
        .collection("users")
        .doc(user?.uid)
        .collection("order")
        .doc(
          today.getFullYear() +
            "" +
            (today.getMonth() + 1) +
            "" +
            today.getDate() +
            "" +
            today.getHours() +
            "" +
            today.getMinutes() +
            "" +
            today.getSeconds()
        )
        .set({
          basket: basket,
          amount: (getBasketTotal(basket) - couponprice) * 100,
          address:
            house + " " + area + " " + city + " " + state + " " + pincode,
          Status: "Received",
          created: date + " " + time,
        });
      const data1 = await db
        .collection("NumberOfOrders")
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            const data = doc.data();
            number = data.number;
            number = number + 1;
            db.collection("NumberOfOrders").doc("number").set({
              number: number,
            });
            db.collection("allorders")
              .doc("items" + number++)
              .set({
                basket: basket,
                Userid: user.uid,
                amount: (getBasketTotal(basket) - couponprice) * 100,
                paymentId:
                  today.getFullYear() +
                  "" +
                  (today.getMonth() + 1) +
                  "" +
                  today.getDate() +
                  "" +
                  today.getHours() +
                  "" +
                  today.getMinutes() +
                  "" +
                  today.getSeconds(),
                address: house + area + city + state + pincode,
                Status: "Received",
                OrderNumber: number,
                created: date + " " + time,
                Mobile: mobile,
              });
          });
        })
        .then(() => {
          neworderform.submit();
          sethandleaddress(false);
          history("/orders");
        });
    } else {
      alert("fill the address");
    }
  };

  const handleChange = (e) => {
    setdisabled(e.empty);
    seterror(e.error ? e.error.message : "");
  };

  const handleAddress = (e) => {
    e.preventDefault();
    setAddressSaved("address saved");
    sethandleaddress(true);
  };

  const applyCoupon = () => {
    if (
      coupon != "" &&
      getBasketTotal(basket) >= firebaseCouponEligibility &&
      coupon == firebaseCouponName
    ) {
      setcouponprice(firebseCouponPrice);
      console.log("coupn>>>>" + couponprice);
      console.log(
        "basket total>>>>" + (getBasketTotal(basket) - couponprice) * 100
      );
      console.log("basket >>>>" + basket);
      console.log("user >>>>" + user.uid);
    }
  };

  useEffect(() => {
    console.log(coupon);
  }, [coupon]);

  useEffect(() => {
    const accordianItem1 = document.querySelector(".accordianItem1");
    const accordianItem2 = document.querySelector(".accordianItem2");

    const accordianItem1Div = document.querySelector(".accordianItem1 > div");
    const accordianItem2Div = document.querySelector(".accordianItem2 > div");

    accordianItem1.addEventListener("click", () => {
      accordianItem1Div.classList.toggle("activeAccordianItem");
    });
    accordianItem2.addEventListener("click", () => {
      accordianItem2Div.classList.toggle("activeAccordianItem");
    });
  });

  return (
    <div className="payment">
      <form
        style={{ display: "none" }}
        className="paymentNewOrder"
        action="https://formspree.io/f/mbjwdwal"
        method="post"
      >
        <input type="text" name="message" />
      </form>
      <div className="payment_container">
        <h1>
          Checkout (<Link to="/checkout">{basket?.length} items</Link>)
        </h1>
        <div className="payment_section">
          <div className="payment_title">
            <h5>Delivery Here</h5>
          </div>
          <div className="payment_address">
            <p>Full Address</p>
            <form onSubmit={handleAddress} className="addressform">
              <label>House Number / Street Address</label>
              <input
                onChange={(e) => setHouse(e.target.value)}
                value={house}
                required
                type="text"
              />
              <label>Area</label>
              <input
                onChange={(e) => setarea(e.target.value)}
                value={area}
                required
                type="text"
              />
              <label>City</label>
              <input
                onChange={(e) => setCity(e.target.value)}
                value={city}
                required
                type="text"
              />
              <label>State</label>
              <input
                onChange={(e) => setstate(e.target.value)}
                value={state}
                required
                type="text"
              />
              <label>Pincode</label>
              <input
                onChange={(e) => setpincode(e.target.value)}
                value={pincode}
                required
                type="number"
              />
              <label>Mobile</label>
              <input
                onChange={(e) => setmobile(e.target.value)}
                value={mobile}
                required
                type="number"
              />
              <button className="submit_area" type="submit">
                Submit Address
              </button>
              <br />
              <div>{AddressSaved}</div>
            </form>
          </div>
        </div>
        <div className="payment_section">
          <div className="payment_title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment_items">
            {basket.map((item) => (
              <BasketProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                weight={item.weight}
                rating={item.rating}
                quantity={item.quantity}
              />
            ))}
          </div>
        </div>
        <div className="payment_section">
          <div className="applyCoupon">
            <div>
              <label>Coupon</label>
              <input type="text" onChange={(e) => setCoupon(e.target.value)} />
            </div>
            <button onClick={applyCoupon}>Apply</button>
            {couponprice != 0 && (
              <div style={{ color: "green" }}>
                You Got {couponprice} ₹ off!!
              </div>
            )}
          </div>
          <div className="payment_title">
            <h3>Payment Method</h3>
          </div>
          <div className="accordian">
            <div className="accordianItem1">
              <li>Card</li>
              <div className="payment_details">
                <form onSubmit={handleSubmit}>
                  <CardElement onChange={handleChange} />
                  <div className="payment_price_container">
                    <CurrencyFormat
                      renderText={(value) => <h3>Order Total : {value}</h3>}
                      decimalScale={2}
                      value={getBasketTotal(basket) - couponprice}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"₹"}
                    />
                    <button disable={processing || disabled || succeeded}>
                      <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                    </button>
                  </div>
                  {error && <div>{error}</div>}
                </form>
              </div>
            </div>
            <div className="accordianItem2">
              <li>Cash On Delivery</li>
              <div className="accordianItem2button">
                <button onClick={handleCOD}>Proceed with COD</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
