import React from "react";
import "./Intro.css";
import Vegetable from "../../Images/broccoli.png";
import Fruit from "../../Images/strawberry.png";
import Dairy from "../../Images/dairy.png";

export default function Intro() {
  return (
    <div className="intro">
      <div className="introImage">
        <img
          src="https://cdn.pixabay.com/photo/2016/11/19/20/55/apples-1841132_960_720.jpg"
          alt=""
        />
        <div className="imgBackground"></div>
      </div>
      <div className="introText">
        <div className="introHeading">A Farmers Farm</div>
        <div className="introSubheading">Little Story About Us</div>
        <div className="introDesc">
          <p>
            Aren’t you fed up of getting home the same fruits and vegetables
            daily and eating the same things on repeat just because of the lack
            of availability of variety in the market? Well, don’t be upset. We
            have got you covered on this one! Imagine getting the best quality
            fruits, vegetables and dairy products just with a tap right when you
            are running late to serve your guests. Isn’t it great to have your
            errands been run at your fingertips?
          </p>
        </div>
        <div className="IntroExtraBottom">
          <div>
            <div>
              <img src={Fruit} alt="" />
            </div>
            <div>
              <span>Organic fruits</span>
              <span>
                Grown with zero toxins and 100% purity, our organically produced
                fruits are rich in nutrients
              </span>
            </div>
          </div>
          <div>
            <div>
              <img src={Vegetable} alt="" />
            </div>
            <div>
              <span>Organic Vegetables</span>
              <span>
                Eating organic isn’t a trend, it’s a return to the tradition.
                Eat best, forget the rest!
              </span>
            </div>
          </div>
          <div>
            <div>
              <img src={Dairy} alt="" />
            </div>
            <div>
              <span>Organic Dairy</span>
              <span>Organic farming is a major principle at BSF.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
