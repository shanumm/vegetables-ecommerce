import React from "react";
import "./Home.css";
import "@splidejs/splide/dist/css/splide.min.css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { Link } from "react-router-dom";
export default function Slider() {
  return (
    <div className="home">
      <div>
        <Splide
          options={{
            autoplay: true,
            perPage: 1,
            type: "loop",
            rewind: true,
            arrows: true,
          }}
        >
          <SplideSlide>
            <div className="splideRelativeText">
              <div className="home_text">
                <span>fresh & clean</span>
                <span>vegetables and fruits at your door step</span>
                <button>
                  <Link to="/aboutuspage">Learn More</Link>
                </button>
              </div>
              <img
                className="home_image"
                src="https://cdn.pixabay.com/photo/2016/11/29/06/15/tomatoes-1867744_960_720.jpg"
                alt=""
              />
            </div>
          </SplideSlide>
          <SplideSlide>
            <div className="splideRelativeText">
              <div className="home_text">
                <span>Daily and occasional offer </span>
                <span>are available for maximum saving.</span>
                <button>
                  <Link to="/aboutuspage">Learn More</Link>
                </button>
              </div>
              <img
                className="home_image"
                src="https://www.healthyeating.org/images/default-source/home-0.0/nutrition-topics-2.0/general-nutrition-wellness/2-2-2-2foodgroups_vegetables_detailfeature.jpg?sfvrsn=226f1bc7_6"
                alt=""
              />
            </div>
          </SplideSlide>
          <SplideSlide>
            <div className="splideRelativeText">
              <div className="home_text">
                <span>cash on delivery are </span>
                <span>available </span>
                <button>
                  <Link to="/aboutuspage">Learn More</Link>
                </button>
              </div>
              <img
                className="home_image"
                src="https://cdn.pixabay.com/photo/2021/10/07/15/24/fruits-6688947_960_720.jpg"
                alt=""
              />
            </div>
          </SplideSlide>
          <SplideSlide>
            <div className="splideRelativeText">
              <div className="home_text">
                <span>Flat 25% discount on </span>
                <span>branded spice</span>
                <button>
                  <Link to="/aboutuspage">Learn More</Link>
                </button>
              </div>
              <img
                className="home_image"
                src="https://cdn.pixabay.com/photo/2018/06/10/17/39/market-3466906_960_720.jpg"
                alt=""
              />
            </div>
          </SplideSlide>
        </Splide>
      </div>
    </div>
  );
}
