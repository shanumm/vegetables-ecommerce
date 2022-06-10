import React, { useState } from "react";
import { Links, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import "./Signin.css";
export default function Signin() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [mobile, setmobile] = useState();
  const history = useNavigate();

  const register = (e) => {
    e.preventDefault();

    // firebase

    auth
      .createUserWithEmailAndPassword(email.trim(), password.trim())
      .then((auth) => {})
      .catch((error) => alert(error.message));

    if (auth) {
      history("/");
    }
  };

  return (
    <div className="signin">
      <div className="login_container">
        <h1>Sign Up</h1>
        <form>
          <h5>E-mail</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
          <h5>Mobile</h5>
          <input
            required
            type="text"
            value={mobile}
            onChange={(e) => setmobile(e.target.value)}
          />
          <button onClick={register} className="login_register">
            Create your account
          </button>
        </form>
        <p>We don't share your data with third party apps or websites</p>
        <button onClick={() => history("/signin")}>Login</button>
      </div>
    </div>
  );
}
