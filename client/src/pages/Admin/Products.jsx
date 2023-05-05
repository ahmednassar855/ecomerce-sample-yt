import React, { useState, useEffect } from "react";
import { AdminMenu } from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Avatar, Card } from "antd";
import Meta from "antd/es/card/Meta";
import { EditOutlined } from '@ant-design/icons';

const Products = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-products`
      );
      console.log(data);
      setProducts(data.products);
      if (data?.products) {
        toast.success("getting data successfully");
      } else {
        toast.error("somethign went wrong while getting producst data");
      }
    } catch (error) {
      console.log(error);
      toast.error("somethign went wrong while getting producst data");
    }
  };
  const  navigateTo =  (slug) => {
      navigate(`get-product/${slug}`)
  }

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout title={"Dashboard - Create Product Ecommerce App"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>

          <div className="col-md-9">
            <h1 className="text-center">All products list</h1>
            <div className="row ">
              {products?.map((p) => (
                // <Link
                //   to={`${process.env.REACT_APP_API}/api/v1/product/get-product/${p.slug}`}
                //   className="col-4 mb-3 product-link"
                //   style={{ width: "18rem" }}
                // >
                //   <div className="card w-100 h-100">
                //     <img
                //       src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                //       className="card-img-top w-100 h-100"
                //       alt={p.name}
                //     />
                //     <div className="card-body">
                //       <h5 className="card-title">{p.name}</h5>
                //       <p className="card-text">{p.description}</p>
                //     </div>
                //   </div>
                // </Link>
                <Card
                key={p._id}
                className="col-4 gap-4 mb-2"
                style={{ width: "18rem" , margin:5}}
                  // style={{ width: 200  , margin:5}}
                  cover={
                    <img
                      alt={p.name}
                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                      height={"200px"}
                      width={"200px"}
                    />
                  }
                  actions={[
                    <EditOutlined key="edit" onClick={ () => navigateTo(p.slug)}/>,
                  ]}
                >
                  <Meta
                    avatar={
                      <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
                    }
                    title={p.name }
                    description={p.description}
                  />
                  
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
