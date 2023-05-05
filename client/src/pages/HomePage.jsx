import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";

const HomePage = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // get all categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-categories`
      );
      if (data?.success) {
        setCategories(data?.categories);
      }
    } catch (error) {
      console.log(error);
      toast.error("Soemthing went wrong while getting categories");
    }
  };

  useEffect(() => {
    getAllCategories();
    getTotal();
  }, []);

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      if (data?.success) {
        setProducts(data.products);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Soemthing went wrong while getting product");
    }
  };

  // get total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-count`
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
    // eslient-disable-next-line
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  // filter products
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/product-filter`,
        { checked, radio }
      );
      console.log(data);
      setProducts(data?.filterProducts);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"Best shopping offers - Ecommerce"}>
      <div className="row mt-3">
        <div className="col-md-2">
          <h4 className="text-center">Filter by category</h4>

          <div className="p-4 d-flex flex-column">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>

          <h4 className="text-center">Filter by Price</h4>
          <div className="p-4 d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((price) => (
                <div key={price._id}>
                  <Radio value={price.array}>{price.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="p-4 d-flex flex-column">
            <button
              className="btn btn-secondary"
              onClick={() => {
                window.location.reload();
              }}
            >
              Reset Filter
            </button>
          </div>
        </div>
        <div className="col-md-10">
          <h1 className="text-center">All products</h1>
          <div className="row text-center">
            {products?.map((p) => (
              <div
                // key={p._id}
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
                    onClick={() => navigate(`product/${p.slug}`)}
                  >
                    See Details
                  </button>
                  <button
                    className="btn btn-secondary ms-1"
                    onClick={() => {
                      if ( auth?.token ){
                        setCart([...cart, p]);
                        localStorage.setItem('cart' , JSON.stringify([...cart , p]))
                        toast.success(' Item added to cart')
                      }else{
                        toast.error("PLease Log in to can shopping !!!!!")
                      }
                      
                    }}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="m-2 p-3">
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
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
