import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { AdminMenu } from "../../components/Layout/AdminMenu";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Select } from "antd";
import { useAuth } from "../../context/auth";
import { Modal } from "antd";

const { Option } = Select;
const UpdateProduct = () => {
  const [auth] = useAuth();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletedId, setDeletedId] = useState("");
  const [updatedName, setUpdatedName] = useState("");

  const navigate = useNavigate();
  const params = useParams();

  const [id, setId] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [shipping, setShipping] = useState("");
  const [quantity, setQuantity] = useState("");

  // get category
  const getSingleCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
      );
      setId(data.product._id);
      setName(data.product.name);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
      setCategory(data.product.category._id);
    } catch (error) {
      console.log(error);
      toast.error("Soemthing went wrong while getting single category");
    }
  };

  useEffect(() => {
    getSingleCategory();
    // getAllCategories();

    // eslient-disable-next-line
  }, []);
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
    // eslient-disable-next-line
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("createdBy", auth?.user?.id);
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("shipping", shipping);
      photo && productData.append("photo", photo);
      productData.append("category", category);

      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/product/update-product/${id}`,
        productData
      );
      console.log("axios product updated", data);
      if (data?.success) {
        getAllCategories();
        toast.success("product updated successfully");
        setTimeout(() => {
          
          navigate("/dashboard/admin/products");
        }, 1000);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong while updating product");
    }
  };

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/product/delete-product/${id}`
      );
      if (data?.success) {
        toast.success(`Deleted Successfully`);
        setDeletedId(null);
        setIsModalOpen(false);
        getAllCategories();
        setTimeout(() => {
          navigate("/dashboard/admin/products");
        }, 1000);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong while deleting product");
    }
  };
  return (
    <Layout title={"Dashboard - Update Product Ecommerce App"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9 w-75">
            <h1>Update Product </h1>
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
                value={category}
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
              {photo ? (
                <div className="text-center">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="product_photo"
                    height={"200px"}
                    width={"200px"}
                    className="img img-responsive"
                  />
                </div>
              ) : (
                <div className="text-center">
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${id}`}
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
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div className="mb-3 w-75">
              <input
                type="text"
                value={description}
                placeholder="Enter a description"
                className="form-control"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </div>
            <div className="mb-3 w-75">
              <input
                type="number"
                value={price}
                placeholder="Enter a price"
                className="form-control"
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
            </div>
            <div className="mb-3 w-75">
              <input
                type="number"
                value={quantity}
                placeholder="Enter a quantity"
                className="form-control"
                onChange={(e) => {
                  setQuantity(e.target.value);
                }}
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
                value={shipping ? "Yes" : "No"}
              >
                <Option value="0"> No</Option>
                <Option value="1"> Yes</Option>
              </Select>
            </div>
            <div className="mb-3">
              <button
                className="btn btn-outline-primary"
                onClick={handleUpdate}
              >
                Update Product
              </button>
            </div>
            <div className="mb-3">
              <button
                className="btn btn-outline-danger"
                onClick={() => {
                  setIsModalOpen(true);
                  setUpdatedName(name);
                }}
              >
                Delete Product
              </button>
            </div>
            <Modal
              title="Delete"
              onCancel={() => setIsModalOpen(false)}
              footer={null}
              open={isModalOpen}
            >
              <h4>Confirm to Delete : {name}</h4>
              <button
                type="submit"
                className="btn btn-danger"
                onClick={() => handleDelete(id)}
              >
                confirm
              </button>
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
