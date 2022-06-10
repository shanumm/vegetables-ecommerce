import React, { useEffect } from "react";
import "./Card.css";

export default function Card({ a, image }) {


  return (
    <div className="card">
      <div className="card-img">
        <img src={image} alt="" />
      </div>
      <div className="card-text">{a}</div>
    </div>
  );
}
