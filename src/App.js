import "./App.css";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./Components/Landing/Landing";
import Checkout from "./Components/Checkout/Checkout";
import Header from "./Components/Header/Header";
import Signin from "./Components/Signin/Signin";
import Shop from "./Components/Shop/Shop";
import Payment from "./Components/Checkout/Payment";
import React, { useEffect } from "react";
import { auth, db } from "./firebase";
import { useStateValue } from "./Components/Stateprovider/Stateprovider";
import Footer from "./Components/Footer/Footer";
import Contact from "./Components/Contact/Contact";
import Orders from "./Components/Orders/Orders";
import AddProducts from "./Components/AddProducts/AddProducts";
import Admin from "./Components/Admin/Admin";
import FarmersPage from "./Components/FarmersPage/FarmersPage";
import Farmersignin from "./Components/FarmerSignin/Farmersignin";
import FasmerDashboard from "./Components/FarmersPage/FasmerDashboard";
import Addrequest from "./Components/AddRequest/Addrequest";
import Fr from "./Components/All Json Product Files/Fruits.json";
import CategoryShop from "./Components/CategoryShop/CategoryShop";
import AboutUsPage from "./Components/AbousUsPage/AboutUsPage";
import Signup from "./Components/Signin/Signup";
import TandC from "./Components/T&C/TandC";
import PrivacyPolicy from "./Components/Privacy/PrivacyPolicy";

const promise = loadStripe(
  "pk_test_51KFKPQSEzGgZfCwJZ3niSn0wMhqbTXq5TW1eQnFkKsf28nfz48M65nb832i0DgmnDaLQxMG4JxjRdl6RLm3K6amT00PICsytjv"
);

function App() {
  const [{}, dispatch] = useStateValue();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  // const tringnew = async () => {
  //   const data = await db.collection("Fruits").get();
  //   for (var snap of data.docs) {
  //     console.log(snap.data());
  //     const newData = await db.collection("Fruits").doc().set({
  //       Price: snap.data().Price,
  //       image: snap.data().image,
  //       weight: snap.data().weight,
  //     });
  //   }
  //   console.log("finished");
  // };

  return (
    <Router basename="/">
      {/* <button onClick={tringnew}>trings</button>
      <br />
      <br />
      <br /> */}
      <div className="App">
        <Header />
       
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route path="/checkout" element={<Checkout />}></Route>
          <Route
            path="/payment"
            element={
              <Elements stripe={promise}>
                <Payment />
              </Elements>
            }
          ></Route>
          <Route path="/signin" element={<Signin />}></Route>
          <Route path="/shop" element={<CategoryShop />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/orders" element={<Orders />}></Route>
          <Route path="/admin" element={<Admin />}></Route>
          <Route path="/addProducts" element={<AddProducts />}></Route>
          <Route path="/farmer" element={<FarmersPage />}></Route>
          <Route path="/farmersignin" element={<Farmersignin />}></Route>
          <Route path="/farmerDashBoard" element={<FasmerDashboard />}></Route>
          <Route path="/addrequest" element={<Addrequest />}></Route>
          <Route path="/categoryShop" element={<CategoryShop />}></Route>
          <Route path="/aboutuspage" element={<AboutUsPage />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/termsandconditions" element={<TandC />}></Route>
          <Route path="/privacy" element={<PrivacyPolicy />}></Route>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
