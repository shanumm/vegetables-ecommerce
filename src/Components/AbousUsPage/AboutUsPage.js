import React from "react";
import AboutUs from "../AboutUs/AboutUs";
import Intro from "../Intro/Intro";
import Whychooseus from "../WhyChooseUs/Whychooseus";

export default function AboutUsPage() {
  return (
    <div>
      {" "}
      <Intro />
      <AboutUs />
      <Whychooseus />
    </div>
  );
}
