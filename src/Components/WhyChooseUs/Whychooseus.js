import React from "react";
import "./whychooseus.css";
import Vegebag from "../../Images/vegebag.png";
import Checked from "../../Images/checked.png";
export default function Whychooseus() {
  return (
    <div className="whyChooseUs">
      <div className="whychooseusHeading">
        <h2>Why Choose Us </h2>
        <h4>Features</h4>
      </div>
      <div className="whyChooseUsContent">
        <div className="whyChooseUsContentLeft">
          <div>
            <span>Product Quality</span>
            <span>
              <img src={Checked} alt="" />
            </span>
          </div>
          <div>
            <span>Always Fresh</span>
            <span>
              <img src={Checked} alt="" />
            </span>
          </div>
          <div>
            <span>100% Natural</span>
            <span>
              <img src={Checked} alt="" />
            </span>
          </div>
        </div>
        <div className="whyChooseUsContentImg">
          <img src={Vegebag} alt="" />
        </div>
        <div className="whyChooseUsContentRight">
          <div>
            <span>
              <img src={Checked} alt="" />
            </span>
            <span>100% Organic</span>
          </div>
          <div>
            <span>
              <img src={Checked} alt="" />
            </span>
            <span>Super Healthy</span>
          </div>
          <div>
            <span>
              <img src={Checked} alt="" />
            </span>
            <span>Best Quality</span>
          </div>
        </div>
      </div>
    </div>
  );
}
