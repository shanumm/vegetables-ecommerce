import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";
import "./addproducts.css";
import { useNavigate } from "react-router-dom";
import { storage, db } from "../../firebase";
import { useStateValue } from "../Stateprovider/Stateprovider";

export default function AddProducts() {
  const [{ basket, user }, dispatch] = useStateValue();

  const history = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [uploadCategory, setuploadCategory] = useState("");
  const [imageError, setImageError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [uploadError, setUploadError] = useState("");
  const [weightCategory, setWeightCategory] = useState("");
  const types = ["image/jpg", "image/jpeg", "image/png", "image/PNG"];
  const handleProductImg = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && types.includes(selectedFile.type)) {
        setImage(selectedFile);
        setImageError("");
      } else {
        setImage(null);
        setImageError("pelase select a valid image type (png,jpg,jpeg)");
      }
    } else {
      console.log("please select a file");
    }
  };

  const category = document.querySelector(".category");

  const getcategoryvalue = () => {
    const dropdown = document.querySelector(".dropDownValues");
    setuploadCategory(dropdown.value);
    console.log(dropdown.value);
  };

  const selectWeigthCategory = () => {
    const weight = document.querySelector(".weightCategory");
    setWeightCategory(weight.value);
    console.log(weightCategory);
  };

  const handleAddProducts = (e) => {
    e.preventDefault();

    if (uploadCategory == "Fruits") {
      const uploadTask = storage.ref(`product-images/${image.name}`).put(image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => setUploadError(error.message),
        () => {
          storage
            .ref("product-images")
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              db.collection(uploadCategory)
                .add({
                  Name: title,
                  weight: description,
                  Price: Number(price),
                  image: url,
                })
                .then(() => {
                  setSuccessMsg("Product added Succesfully");
                  setTitle("");
                  setDescription("");
                  setPrice("");
                  document.querySelector("#file").value = "";
                  setImageError("");
                  setUploadError("");
                  setTimeout(() => {
                    setSuccessMsg("");
                  }, 3000);
                });
            })
            .catch((error) => setUploadError(error.message));
        }
      );
    } else if (
      uploadCategory == "Dairy Products" ||
      uploadCategory == "Dry Fruits"
    ) {
      const uploadTask = storage.ref(`product-images/${image.name}`).put(image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => setUploadError(error.message),
        () => {
          storage
            .ref("product-images")
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              db.collection(uploadCategory)
                .add({
                  title: title,
                  weight: description,
                  price: Number(price),
                  image: url,
                })
                .then(() => {
                  setSuccessMsg("Product added Succesfully");
                  setTitle("");
                  setDescription("");
                  setPrice("");
                  document.querySelector("#file").value = "";
                  setImageError("");
                  setUploadError("");
                  setTimeout(() => {
                    setSuccessMsg("");
                  }, 3000);
                });
            })
            .catch((error) => setUploadError(error.message));
        }
      );
    } else if (uploadCategory == "New Vegetables") {
      const uploadTask = storage.ref(`product-images/${image.name}`).put(image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => setUploadError(error.message),
        () => {
          storage
            .ref("product-images")
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              db.collection(uploadCategory)
                .add({
                  title,
                  user: user.email,
                  weightCategory,
                  price: Number(price),
                  url,
                })
                .then(() => {
                  setSuccessMsg("Product added Succesfully");
                  setTitle("");
                  setWeightCategory("");
                  setDescription("");
                  setPrice("");
                  document.querySelector("#file").value = "";
                  setImageError("");
                  setUploadError("");
                  setTimeout(() => {
                    setSuccessMsg("");
                  }, 3000);
                });
            })
            .catch((error) => setUploadError(error.message));
        }
      );
    }
  };

  return (
    <>
      {user && user.email === "adminxya@gmail.com" ? (
        <div className="addProducts">
          <br />
          <br />
          <br />
          <h1>Add Products</h1>
          <hr />

          {successMsg && (
            <>
              <div className="success-msg">{successMsg}</div>
              <br />
            </>
          )}

          <form
            autoComplete="off"
            className="form_group"
            onSubmit={handleAddProducts}
          >
            <label>Product Category</label>
            <select onChange={getcategoryvalue} className="dropDownValues">
              <option value="Fruits">Fruits</option>
              <option value="New Vegetables">Vegetables</option>
              <option value="Dairy Products">Dairy</option>
              <option value="Dry Fruits">Dry Fruits</option>
            </select>

            <label>Product Title</label>
            <input
              type="text"
              className="form_control"
              required
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            <br />
            {uploadCategory != "New Vegetables" &&
              uploadCategory != "Catch Spices" && (
                <>
                  <label>Product Weight (Eg: 1kg/500gm/12pcs)</label>
                  <input
                    type="text"
                    className="form_control"
                    required
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                  />
                </>
              )}
            {uploadCategory === "New Vegetables" && (
              <>
                <label>Select price of weight:</label>
                <select
                  className="weightCategory"
                  onChange={selectWeigthCategory}
                >
                  <option value="price100">Price of 100gm</option>
                  <option value="price250">Price of 250gm</option>
                  <option value="price500">Price of 500gm</option>
                  <option value="price1kg">Price of 1kg</option>
                </select>
              </>
            )}

            <br />
            {}
            <label>Product Price (In Rs)</label>
            <input
              type="text"
              className="form_control"
              required
              onChange={(e) => setPrice(e.target.value)}
              value={price}
            />

            <br />
            <label>Upload Product Image</label>
            <input
              type="file"
              id="file"
              className="form_control"
              required
              onChange={handleProductImg}
            />
            <br />
            {imageError && (
              <>
                <br />
                <div className="error_message">{imageError}</div>
              </>
            )}
            <div>
              <button type="submit">Submit</button>
            </div>
          </form>
          {uploadError && (
            <>
              <br />
              <div className="error_message">{uploadError}</div>
            </>
          )}
        </div>
      ) : (
        history("/")
      )}
    </>
  );
}
