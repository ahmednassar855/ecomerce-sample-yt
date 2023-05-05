import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { AdminMenu } from "../../components/Layout/AdminMenu";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from 'react-router-dom'
import { Select } from "antd";
import { useAuth } from "../../context/auth";

const { Option } = Select;

const CreateProduct = () => {
  const [auth] = useAuth();
  // {auth?.user?.name}

  const navigate = useNavigate()

  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [shipping, setShipping] = useState("");
  const [quantity, setQuantity] = useState("");

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
  }, []);

  const handleCreate = async(e) => {
    e.preventDefault();
    try {
      const productData = new FormData()
      productData.append("name" , name)
      productData.append("description" , description)
      productData.append("price" , price)
      productData.append("quantity" , quantity)
      productData.append("shipping" , shipping)
      productData.append("photo" , photo)
      productData.append("category" , category)
      const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/create-product` , productData)
      if (data?.success){
        toast.success('product added successfully')
        setTimeout( ()=> {
          navigate("/dashboard/admin/products")
        } , 1000)
      }else{
        toast.error(data?.message)
      }
    } catch (error) {
      console.log(error);
      toast.error("something wnt wrogn while creating product")
    }
  }
  return (
    <Layout title={"Dashboard - Create Product Ecommerce App"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9 w-75">
            <h1>Create Product </h1>
            <div className="m-1">
              <Select
                bordered={false}
                placeholder="Select a Category"
                size="large"
                showSearch
                showArrow={false}
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
            </div>
            <div className="m-1 mb-3 w-75">
              <label className="btn btn-outline-secondary">
                {photo ? photo.name : "upload photo"}
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  hidden
                />
              </label>
            </div>
            <div className="mb-3 w-75">
              {photo && (
                <div className="text-center">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="product_photo"
                    height={"200px"}
                    width={"200px"}
                    className="img img-responsive"
                  />
                </div>
              )}
            </div>

            <div className="mb-3 w-75">
              <input
                type="text"
                value={name}
                placeholder="Enter a name"
                className="form-control"
                onChange={ (e) => { setName( e.target.value ) } }
              />
            </div>
            <div className="mb-3 w-75">
              <input
                type="text"
                value={description}
                placeholder="Enter a description"
                className="form-control"
                onChange={ (e) => { setDescription( e.target.value ) } }
              />
            </div>
            <div className="mb-3 w-75">
              <input
                type="number"
                value={price}
                placeholder="Enter a price"
                className="form-control"
                onChange={ (e) => { setPrice( e.target.value ) } }
              />
            </div>
            <div className="mb-3 w-75">
              <input
                type="number"
                value={quantity}
                placeholder="Enter a quantity"
                className="form-control"
                onChange={ (e) => { setQuantity( e.target.value ) } }
              />
            </div>
            <div className="mb-3 w-75">
            <Select
                bordered={false}
                placeholder="Select  Shipping"
                size="large"
                showSearch
                showArrow={false}
                className="form-select mb-3"
                onChange={(value) => {
                  setShipping(value);
                }}
              >
                <Option value="0"> No</Option>
                <Option value="1"> Yes</Option>
              </Select>
            </div>
            <div className="mb-3">
              <button className="btn btn-outline-primary" onClick={handleCreate}>Create Product</button>

            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
