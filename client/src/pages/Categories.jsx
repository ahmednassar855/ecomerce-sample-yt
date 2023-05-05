import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import useCategory from "../hooks/useCategory";

const Categories = () => {
  const allCategories = useCategory();
  return (
    <Layout title={"All categories - Ecommerce"}>
      <div className="container">
        <div className="row">
          {allCategories?.map((c) => (
            <div className="col-md-6 mt-5 mb-3 gx-3" key={c._id}>
              <button className="btn btn-primary">
                <Link to={`/category/${c.slug}`} className="btn btn-primary">{c.name}</Link>
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
