import React, { useEffect, useState } from "react";
import "./footer.css";
import { Link } from "react-router-dom";
import { useStateValue } from "../Stateprovider/Stateprovider";
import { db } from "../../firebase";
export default function Footer() {
  const [isFarmer, setisFarmer] = useState(false);
  const [{ basket, user }, dispatch] = useStateValue();

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

  useEffect(() => {
    if (user) {
      checkIfFarmer();
     
    } else {
      setisFarmer(false);
    }
  }, [user]);

  return (
    <footer class="site-footer">
      <div style={{ padding: "1rem 0" }}>
        <i class="fa fa-facebook" aria-hidden="true"></i>
        <i class="fa fa-instagram" aria-hidden="true"></i>
        <i class="fa fa-youtube" aria-hidden="true"></i>
      </div>
      <div>
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/shop">
          <li>Shop</li>
        </Link>
        <Link to="/orders">
          <li>Orders</li>
        </Link>
        <Link to="/contact">
          <li>Contact Us</li>
        </Link>
        <Link to="/privacy">
          <li>Privacy Policy</li>
        </Link>
        <Link to="/termsandconditions">
          <li>T&C</li>
        </Link>
      </div>
      <div>bfsmart &copy; 2022</div>
    </footer>
  );
}
