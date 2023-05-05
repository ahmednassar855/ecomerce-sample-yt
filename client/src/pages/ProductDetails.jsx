import Layout from "../components/Layout/Layout";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ProductDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [product, setProduct] = useState({});
  const [similarProducts, setSimilarProducts] = useState([]);

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
      );
      console.log(data);
      setProduct(data?.product);

      getSimialrProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  // get similar productss
  const getSimialrProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/related-product/${pid}/${cid}`
      );
      setSimilarProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title="prdouct details - ecommerce">
      <div className="row container-fluid mt-4 ms-0 me-0 p-4 gap-4">
        <div className="col-md-4 text-center shadow-lg p-4">
          <img
            src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
            className="card-img-top"
            style={{ height: "400px", width: "400px" }}
            alt={product.name}
          />
        </div>
        <div className="col-md-6  p-4 d-flex flex-column gap-2">
          <h1>Product Detials</h1>
          <h6>Name : {product.name}</h6>
          <h6>Price : {product.price} </h6>
          <h6>Descritpion : {product.description}</h6>
          <h6>Stock : {product.quantity}</h6>

          <h6>Category : {product.category?.name}</h6>
          <button className="btn btn-secondary w-25">Add To Cart</button>
        </div>
      </div>
      <div className="row container mt-2 text-center m-auto">
        <h4>Similar product</h4>
        {similarProducts.length < 1 && <p>No Similar Products found</p>}
        <div className="d-flex justify-content-evenly">
          {similarProducts?.map((p) => (
            <div
              className="card m-2 p-4 shadow-lg"
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
                <p className="card-text">{p.description.substring(0, 30)}...</p>
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
      </div>
    </Layout>
  );
};

export default ProductDetails;
