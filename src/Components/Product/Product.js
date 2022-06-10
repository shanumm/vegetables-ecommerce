import React, { useEffect, useState } from "react";
import { useStateValue } from "../Stateprovider/Stateprovider";
import "./Product.css";

export default function Product({
  id,
  title,
  image,
  price,
  products,
  product,
}) {
  const [quantity, setquantity] = useState(1);

  useEffect(() => {
    const productButton = document.querySelectorAll(".add_to_cart_button");
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

  function decrement() {
    if (quantity != 1) {
      setquantity(quantity - 1);
    }
  }
  function increment() {
    setquantity(quantity + 1);
  }

  const [{ basket }, dispatch] = useStateValue();

  const addToBasket = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: product.ID,
        title: product.title,
        image: product.url,
        price: product.price * quantity,
        quantity: quantity,
      },
    });
  };

  return (
    <div className="product">
      <img src={product.url} alt="" />
      <h2>{product.title}</h2>
      <h3>{product.price + " "} ₹</h3>
      <div className="quantityAddCartButton">
        <div>
          <button onClick={increment}>
            <i class="fa fa-arrow-up" aria-hidden="true"></i>
          </button>

          <button onClick={decrement}>
            <i class="fa fa-arrow-down" aria-hidden="true"></i>
          </button>
        </div>
        <button onClick={addToBasket} className="add_to_cart_button">
          <i class="fas fa-cart-plus"></i>
          Add to cart {quantity}
        </button>
      </div>
    </div>
  );
}
