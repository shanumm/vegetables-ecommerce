import React from "react";
import CurrencyFormat from "react-currency-format";
import { useNavigate } from "react-router-dom";
import { getBasketTotal } from "../Stateprovider/reducer";
import { useStateValue } from "../Stateprovider/Stateprovider";
import "./subtotal.css";
export default function Subtotal() {
  const history = useNavigate();
  const [{ basket, user }, dispatch] = useStateValue();

  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({basket?.length} Items): <strong>{value}</strong>
            </p>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"₹"}
      />
      {user ? (
        <button onClick={(e) => history("/payment")}>
          Proceed to checkout
        </button>
      ) : (
        <button onClick={(e) => history("/signin")}>Proceed to checkout</button>
      )}
    </div>
  );
}
