import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const CategoryProduct = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const params = useParams();

  useEffect(() => {
    if (params?.slug) getProductByCategory();
  }, [params?.slug]);

  const getProductByCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title={"Category - product Ecommerce"}>
      <div className="container mt-3">
        <h1>hi</h1>
        <h1 className="text-center">Category - {category?.name}</h1>
        <h1 className="text-center">{products?.length} result found</h1>
        <div className="row">
          <div className="row text-center justify-content-evenly">
            {products?.map((p) => (
              <div
                key={p._id}
                className="col-4 card m-2 p-4 shadow-lg"
                style={{ width: "300px", height: "300px" }}
              >
                <img
                  src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top w-100 h-100"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <h5 className="card-title">$ {p.price}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                </div>
                <div className="d-flex gap-4">
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    See Details
                  </button>
                  <button className="btn btn-secondary">Add To Cart</button>
                </div>
              </div>
            ))}
          </div>
          {/* <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading..." : "loadmore"}
              </button>
            )}
          </div> */}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
