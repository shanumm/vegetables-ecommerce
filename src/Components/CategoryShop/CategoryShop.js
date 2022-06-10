import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { useStateValue } from "../Stateprovider/Stateprovider";
import AllCategoryComponent from "./AllCategoryComponent";
import "./CategoryShop.css";
import IndividualCategoryComponent from "./IndividualCategoryComponent";
import { stringg } from "../Landing/Landing.js";
import { useLocation } from "react-router-dom";
export default function CategoryShop() {
  const [category, setcategory] = useState(stringg);
  const [categoryproducts, setcategoryproducts] = useState([]);
  const [discount, setdiscount] = useState(false);
  const [multiplevege, setmultiplevege] = useState(true);

  const getCategory = async () => {
    const categoryArray = [];

    var data = await db.collection(stringg).get();

    if (category == "fruits") {
      setdiscount(false);
      data = await db.collection("Fruits").get();
      setmultiplevege(false);
    }
    if (category == "vegetable") {
      setdiscount(false);
      data = await db.collection("New Vegetables").get();
      setmultiplevege(true);
    }
    if (category == "spices") {
      setdiscount(true);
      data = await db.collection("Catch Spices").get();
      setmultiplevege(false);
    }
    if (category == "dairy") {
      setdiscount(false);
      data = await db.collection("Dairy Products").get();
      setmultiplevege(false);
    }
    if (category == "dryfruits") {
      setdiscount(false);
      data = await db.collection("Dry Fruits").get();
      setmultiplevege(false);
    }
    if (category == "seasonal") {
      setdiscount(false);
      data = await db.collection("On Demand or Seasonal").get();
      setmultiplevege(true);
    }

    for (var snap of data.docs) {
      var data1 = snap.data();
      data1.ID = snap.id;
      categoryArray.push({ ...data1 });
      if (categoryArray.length == data.docs.length) {
        setcategoryproducts(categoryArray);
      }
    }
  };

  useEffect(() => {
    getCategory();
  }, [category]);

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <div className="categoryShop">
      <div className="category-sections">
        <h2>Choose Category</h2>
        <div className="category-buttons">
          <button onClick={() => setcategory("vegetable")}>Vegetables</button>
          <button onClick={() => setcategory("fruits")}>Fruits</button>
          <button onClick={() => setcategory("dairy")}>Dairy</button>
          <button onClick={() => setcategory("spices")}>Spices</button>
        </div>
        {multiplevege && (
          <div className="multipleVegetables">
            <div onClick={() => setcategory("vegetable")}>
              <img
                src="https://cdn.pixabay.com/photo/2016/03/10/18/44/top-view-1248955_960_720.jpg"
                alt=""
              />
              <h5>Regular</h5>
            </div>
            <div>
              <img
                src="https://cdn.pixabay.com/photo/2020/09/12/21/12/tomatoes-5566741_960_720.jpg"
                alt=""
              />
              <h5>Organic</h5>
            </div>
            <div onClick={() => setcategory("seasonal")}>
              <img
                src="https://cdn.pixabay.com/photo/2015/07/17/13/44/cucumbers-849269_960_720.jpg"
                alt=""
              />
              <h5>Herbs and Seasonal</h5>
            </div>
          </div>
        )}
        <div className="showingnumber">
          Showing 1-{categoryproducts.length} of {categoryproducts.length} items
          <hr />
        </div>
      </div>{" "}
      <div className="allProductsCategory">
        {categoryproducts.length > 0 && (
          <AllCategoryComponent
            discount={discount}
            products={categoryproducts}
            multiplevege={multiplevege}
          />
        )}
        {categoryproducts.length < 1 && <>Please Wait...</>}
      </div>
    </div>
  );
}
