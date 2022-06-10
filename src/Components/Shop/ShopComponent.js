import React, { useEffect } from "react";
import "./shopcomponent.css";
// import "react-bootstrap";
import { useStateValue } from "../Stateprovider/Stateprovider";
export default function ShopComponent({ id, title, image, price, product }) {
  // export default function ShopComponent({ product }) {
  const [{ basket }, dispatch] = useStateValue();

  useEffect(() => {
    const productButton = document.querySelectorAll(".shop-component-button");
    const onaddpopup = document.querySelector(".onaddpopup");
    productButton.forEach((pb) => {
      pb.addEventListener("click", () => {
        onaddpopup.classList.remove("onaddpopupActive");
        onaddpopup.classList.add("onaddpopupActive");
        onaddpopup.addEventListener("animationend", () => {
          onaddpopup.classList.remove("onaddpopupActive");
        });
      });
    });
  });

  const addToBasket = () => {
    var price = 0;
    var title = "";
    if (product?.price != null) {
      price = product.price;
    }
    if (product?.Price != null) {
      price = product.Price;
    }
    if (product?.salesPrice != null) {
      price = product.salesPrice;
    }
    if (product?.price100 != null) {
      price = product.price100;
    }
    if (product?.price250 != null) {
      price = product.price250;
    }
    if (product?.price500 != null) {
      price = product.price500;
    }
    if (product?.price1kg != null) {
      price = product.price1kg;
    }
    if (typeof product.Name != "undefined") {
      title = product.Name;
    }
    if (typeof product.title != "undefined") {
      title = product.title;
    }
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: product.ID,
        title: title,
        image: product?.url ? product?.url : product?.image,
        price: price,
        weight: product.weight,
      },
    });
  };
  return (
    <div className="shopcomponent">
      <div className="shop-component-image">
        <img src={product?.url ? product?.url : product?.image} alt="" />
      </div>
      <div className="shop-component-title">
        <div>
          <strong>
            {product?.title} {product?.Name}
          </strong>{" "}
          {product?.weight}
        </div>
      </div>
      <div className="shop-component-desc">
        <div>
          <p>{product?.description}</p>
        </div>
      </div>

      <div className="shop-component-price">
        <div>
          {product?.Price}
          {product?.price}
          {product?.price100}
          {product?.price250}
          {product?.price500}
          {product?.price1kg}₹
        </div>
      </div>
      <div className="shop-component-button">
        <button onClick={addToBasket}>
          <i class="fas fa-cart-plus    "></i>
          Add To Cart
        </button>
      </div>
    </div>
  );
}
