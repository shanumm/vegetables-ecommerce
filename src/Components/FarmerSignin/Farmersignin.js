import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import "./farmersignin.css";
export default function Farmersignin() {
  const [name, setname] = useState();
  const [number, setnumber] = useState();
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const history = useNavigate();

  const signin = (e) => {
    e.preventDefault();

    // firebase

    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        history("/");
      })
      .catch((error) => alert(error.message));
  };

  const register = (e) => {
    e.preventDefault();

    // firebase

    db.collection("Farmers Account").doc(email).collection("farmer").add({
      name,
      number,
      email,
      type: "farmer",
    });

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
      })
      .catch((error) => alert(error.message));

    if (auth) {
      history("/");
    }
  };

  return (
    <div className="Farmersignin">
      <div className="login_container">
        <h1>Sign In</h1>
        <form className="farmerSignInForm">
          <h5>Name</h5>
          <input
            type="text"
            value={name}
            onChange={(e) => setname(e.target.value)}
          />
          <h5>Mobile Number</h5>
          <input
            type="number"
            value={number}
            onChange={(e) => setnumber(e.target.value)}
          />
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
          <h5>Type : Farmer</h5>
          <button type="submit" onClick={signin} className="login_signIn">
            Sign In
          </button>
        </form>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim velit
          vitae inventore quae ipsum impedit iusto odit harum! Porro quisquam
          magnam consequuntur aspernatur, recusandae adipisci autem optio
        </p>
        <button onClick={register} className="login_register">
          Create your account
        </button>
      </div>
    </div>
  );
}
