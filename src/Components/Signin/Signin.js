import React, { useState } from "react";
import { Links, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import "./Signin.css";
export default function Signin() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const history = useNavigate();

  const signin = (e) => {
    e.preventDefault();

    // firebase
    
    auth
      .signInWithEmailAndPassword(email.trim(), password.trim())
      .then((auth) => {
        history("/");
      })
      .catch((error) => alert(error.message));
  };

  const register = (e) => {
    // e.preventDefault();

    // // firebase

    // auth
    //   .createUserWithEmailAndPassword(email, password)
    //   .then((auth) => {})
    //   .catch((error) => alert(error.message));

    
    // if (auth) {
    //   history("/");
    // }

    history("/signup")


  };

  return (
    <div className="signin">
      <div className="login_container">
        <h1>Sign In</h1>
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
          <button type="submit" onClick={signin} className="login_signIn">
            Sign In
          </button>
        </form>
        <p>We don't share your data with third party apps or websites</p>
        <button onClick={register} className="login_register">
          Create your account
        </button>
      </div>
    </div>
  );
}
