import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useStateValue } from "../Stateprovider/Stateprovider";
import "./Header.css";
import { auth, db } from "../../firebase";
import Carrots from "../../Images/7.png";
import Cart from "../../Images/carts.png";

var settingSearchItemrouter = "";

export default function Header() {
  const location = useLocation();
  const [isFarmer, setisFarmer] = useState(false);
  const [{ basket, user }, dispatch] = useStateValue();
  const [searchItems, setSearchItems] = useState([]);
  const [searchtermheader, setsearchtermheader] = useState("");
  const [handlesearchitems, sethandlesearchitems] = useState([]);
  const handleAuthentication = () => {
    if (user) {
      auth.signOut();
    }
  };

  const checkIfFarmer = () => {
    const data = db
      .collection("Farmers Account")
      .doc(user.email)
      .collection("farmer")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          if (doc.data()?.type == "farmer") {
            setisFarmer(true);
          } else {
            setisFarmer(false);
          }
        });
      });
  };

  useEffect(async () => {
    if (user) {
      checkIfFarmer();
    } else {
      setisFarmer(false);
    }
  }, [user]);

  useEffect(() => {
    const menu = document.querySelector(".burgerIcon");
    const menulinks = document.querySelector(".burgerLinks");
    const menuIcon = document.querySelectorAll(
      ".burgerMenu > div:nth-of-type(1) > div"
    );
    menu.addEventListener("click", () => {
      menulinks.classList.toggle("burgerLinksactive");
    });

    const burgerAllLinks = document.querySelectorAll(".Burgernavlinks > a");
    burgerAllLinks.forEach((bal) => {
      bal.addEventListener("click", () => {
        if (menulinks.classList.contains("burgerLinksactive")) {
          menulinks.classList.remove("burgerLinksactive");
        }
      });
    });
  }, []);

  const getAllProducts = async () => {
    const products = await db.collection("allAvailableProducts").get();
    const productarray = [];
    for (var snap of products.docs) {
      var data = snap.data();
      productarray.push({
        ...data,
      });
      if (productarray.length == products.docs.length) {
        setSearchItems(productarray);
      }
    }
  };

  useEffect(() => {
    // getAllProducts();
  }, []);

  return (
    <div className="headerContainer">
      <div className="header">
        <div></div>
        <div class="burgerLinks">
          <div className="Burgernavbar">
            <div className="burgerLinksLoginDiv">
              <span style={{ color: "white" }}>
                {!user ? "Guest" : user.email}
              </span>
            </div>
            <ul className="Burgernavlinks">
              <Link to="/">
                <i class="fa fa-home" aria-hidden="true"></i>
                <li>Home</li>
              </Link>
              <Link to="/shop">
                <i class="fa fa-shopping-bag" aria-hidden="true"></i>
                <li>Shop</li>
              </Link>
              <Link to="/aboutuspage">
                <i class="fa fa-user" aria-hidden="true"></i>
                <li>About</li>
              </Link>
              <Link to="/orders">
                <i class="fa fa-first-order" aria-hidden="true"></i>
                <li>Orders</li>
              </Link>
              <Link to="/contact">
                <i class="fa fa-phone" aria-hidden="true"></i>
                <li>Contact Us</li>
              </Link>

              {!user && (
                <Link to="/farmer">
                  <i class="fa fa-share-alt-square" aria-hidden="true"></i>
                  <li>Sell</li>
                </Link>
              )}
              {user && user.email === "adminxya@gmail.com" && (
                <Link to="/addProducts">
                  <i class="fa fa-product-hunt" aria-hidden="true"></i>
                  <li>Add Products</li>
                </Link>
              )}

              {user && user.email === "adminxya@gmail.com" && (
                <Link to="/admin">
                  <i class="fa fa-user-circle" aria-hidden="true"></i>
                  <li>Admin</li>
                </Link>
              )}
              {user && user.email === "adminxya@gmail.com" && (
                <Link to="/addrequest">
                  <i class="fa fa-plus" aria-hidden="true"></i>
                  <li>ADD REQUEST</li>
                </Link>
              )}
              {user && isFarmer && (
                <Link to="/farmerDashBoard">
                  <li>Farmer</li>
                </Link>
              )}
            </ul>
          </div>
        </div>
        <Link to="/">
          <img className="header_logo" src={Carrots} alt="" />
        </Link>
        <div className="burgerRightSide">
          <div className="BurgerheaderOptions">
            <div className="Burgerheader_login">
              <div className="BurgerheaderSignIn">
                <Link to={!user && "/signin"}>
                  <i class="fa fa-user" aria-hidden="true"></i>
                  <span onClick={handleAuthentication}>
                    {user ? "Sign Out" : "Sign In"}
                  </span>
                </Link>
              </div>
            </div>
            <div className="Burgerheader_login">
              <Link to="/checkout">
                <span>
                  <img src={Cart} alt="" />
                </span>
                <span>{" " + basket.length}</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="navbar">
          <ul className="navlinks">
            <Link to="/">
              <li>Home</li>
            </Link>
            <Link to="/shop">
              <li>Shop</li>
            </Link>
            <Link to="/aboutuspage">
              <li>About</li>
            </Link>
            <Link to="/orders">
              <li>Orders</li>
            </Link>
            <Link to="/contact">
              <li>Contact Us</li>
            </Link>

            {user && user.email === "adminxya@gmail.com" && (
              <Link to="/addProducts">
                <li>Add Products</li>
              </Link>
            )}
            {user && user.email === "adminxya@gmail.com" && (
              <Link to="/admin">
                <li>Admin</li>
              </Link>
            )}
            {user && user.email === "adminxya@gmail.com" && (
              <Link to="/addrequest">
                <li>ADD REQUEST</li>
              </Link>
            )}
            {user && isFarmer && (
              <Link to="/farmerDashBoard">
                <li>Farmer</li>
              </Link>
            )}
          </ul>
        </div>
        <div className="headerOptions">
          <div className="header_login">
            <span>{!user ? "Guest" : user.email}</span>
            <div className="headerSignIn">
              <Link to={!user && "/signin"}>
                <span onClick={handleAuthentication}>
                  {user ? "Sign Out" : "Sign In"}
                </span>
              </Link>
            </div>
          </div>
          <div className="header_login">
            <Link to="/checkout">
              <span>
                <img src={Cart} alt="" />
              </span>
              <span>{" " + basket.length}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

