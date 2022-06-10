const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51KFKPQSEzGgZfCwJHGJMhmwppVf49VzIkTZ35jeS0WsMweEm8IBJpFMHZj7Ae5qkYF1cwsgqVdANJST7cJZ5E1i000U1xlNdnc"
);

// // api

// // app config

const app = express();
// middlewares
app.use(cors({ origin: true }));
app.use(express.json());
// api routes
app.get("/", (request, response) => response.status(200).send("hello world"));
app.post("/payments/create", async (request, response) => {
  const total = request.query.total;
  
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "inr",
  });
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// listen command

exports.api = functions.https.onRequest(app);

// api endpoint
// http://localhost:5001/ecommerce-ab127/us-central1/api
