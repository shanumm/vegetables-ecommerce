import React from "react";
import "./farmerspage.css";
import Farmer from "../../Images/farmer.png";
import { useStateValue } from "../Stateprovider/Stateprovider";
import { auth } from "../../firebase";
import { Navigate, useNavigate } from "react-router-dom";
export default function FarmersPage() {
  const [{ basket, user }, dispatch] = useStateValue();
  const history = useNavigate();
  const handleAuth = () => {
    if (user) {
      auth.signOut();
      history("/farmersignin");
    } else {
      history("/farmersignin");
    }
  };

  return (
    <>
      {!user ? (
        <div className="farmerspage">
          <div>
            <div>
              <h2>Dear Farmers,</h2>
              <p>
                Join hands with us to sell your organically grown produce to
                expand and create the perfect blend of technology and lifestyle.
                You are invited to be a part of the BSF team by selling your
                produce through us, after it has gone through a certain level of
                quality check by us. Be a part of this revolutionary shift of
                daily errands from crowded street vendors to an online, digital
                world.
              </p>
              <button onClick={handleAuth}>Sign Up</button>
            </div>
            <div>
              <img src={Farmer} alt="" />
            </div>
          </div>
          <div className="farmersFeatures">
            <h3>Features</h3>
            <div>
              <div>
                <div>
                  Fair Deals of Prices <br /> Doorstep Delivery <br />
                  Quality Assured
                </div>
              </div>
              <div>
                <div>
                  100% Organic <br />
                  Quick Delivery
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        history("/")
      )}
    </>
  );
}
