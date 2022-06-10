import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, storage } from "../../firebase";
import { useStateValue } from "../Stateprovider/Stateprovider";
import "./FasmerDashboard.css";
export default function FasmerDashboard() {
  const [{ basket, user }, dispatch] = useStateValue();
  const [isFarmer, setisFarmer] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  const [imageError, setImageError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [uploadError, setUploadError] = useState("");

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

  const handleAddProducts = (e) => {
    e.preventDefault();


    const uploadTask = storage
      .ref(`farmer-product-images/${image.name}`)
      .put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);
      },
      (error) => setUploadError(error.message),
      () => {
        storage
          .ref("farmer-product-images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("farmer-Products")
              .add({
                user: user.email,
                title,
                description,
                price: Number(price),
                url,
              })
              .then(() => {
                setSuccessMsg("Product added Succesfully");
                setTitle("");
                setDescription("");
                setPrice("");
                document.querySelector("#file").value = "";
                setImageError("");
                setUploadError("");
                setTimeout(() => {});
                setSuccessMsg("");
              }, 3000);
          })
          .catch((error) => setUploadError(error.message));
      }
    );
  };

  const history = useNavigate();
  const checkIfFarmer = () => {
    const data = db
      .collection("Farmers Account")
      .doc(user.email)
      .collection("farmer")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          if (doc.data()?.type == "farmer") {
            setisFarmer(true);
        
          } else {
            setisFarmer(false);
          }
        });
      });
  };

  console.log(isFarmer);

  useEffect(() => {
    if (user) {
      checkIfFarmer();
    }
  }, [user]);

  return (
    <div>
      {user && isFarmer ? (
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
            <label>Product Title</label>
            <input
              type="text"
              className="form_control"
              required
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            <br />
            <label>Product Description</label>
            <input
              type="text"
              className="form_control"
              required
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
            <br />
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
    </div>
  );
}
