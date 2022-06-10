import React, { useState } from "react";
import { useStateValue } from "../Stateprovider/Stateprovider";
import "./individualcategorycomponent.css";
import Discount from "../../Images/discount.png";
export default function IndividualCategoryComponent({ product, discount }) {
  const [{ basket }, dispatch] = useStateValue();
  const [quantity, setquantity] = useState(1);

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
        image: product.image,
        price: price * quantity,
        weight: product.weight,
        quantity: quantity,
      },
    });
  };

  function decrement() {
    if (quantity != 1) {
      setquantity(quantity - 1);
    }
  }
  function increment() {
    setquantity(quantity + 1);
  }

  return (
    <div className="categoryIndividualProduct">
      <div className="categoryIndividualProductImage">
        <div className="discountImage">
          {discount && <img src={Discount} alt="" />}
        </div>
        <img src={product?.image} alt="" />
      </div>
      <div className="categoryIndividualProductContent">
        <div className="categoryIndividualProductTitle">
          {product?.title} {product?.Name}
        </div>
        <div className="categoryIndividualProductPrice">
          {
            <>
              {product?.price1kg} {product?.price500} {product?.price250}{" "}
              {product?.price100} {product?.Price} {product?.price}
              {product?.salesPrice ? (
                <div className="catchSpicesPrice">
                  <h5>{product?.MRPprice}</h5>
                  {product?.salesPrice + "₹"}
                </div>
              ) : (
                "₹"
              )}
              {product?.weight ? "/" + product?.weight : product?.weight}
            </>
          }
        </div>
        <div className="categoryIndividualProductAddToCartButton">
          <div className="quantityAddCartCategoryButton">
            <div>
              <button onClick={increment}>
                <i class="fa fa-arrow-up" aria-hidden="true"></i>
              </button>
              <button onClick={decrement}>
                <i class="fa fa-arrow-down" aria-hidden="true"></i>
              </button>
            </div>
            <button onClick={addToBasket}>
              <i class="fas fa-cart-plus"></i>
              Add To Cart {quantity}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
