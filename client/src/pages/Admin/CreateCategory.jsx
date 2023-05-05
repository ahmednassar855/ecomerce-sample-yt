import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { AdminMenu } from "../../components/Layout/AdminMenu";
import CategoryFrom from "../../components/Form/CategoryFrom";
import { Modal } from "antd";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);

  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [deletedId, setDeletedId] = useState("");

  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/category/create-category`,
        { name }
      );
      if (data.success) {
        toast.success(`${data.category.name} is created`);
        getAllCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in input form");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data.success) {
        toast.success(`${updatedName} is updated Successfully`);
        setSelected(null);
        setUpdatedName("");
        setIsModalOpen(false);
        getAllCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in input form");
    }
  };

  const handleDelete = async (deletedId) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/category/delete-category/${deletedId}`
      );
      if (data.success) {
        toast.success(`Deleted Successfully`);
        setDeletedId(null);
        setIsModalOpen2(false);
        getAllCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in input form");
    }
  };

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

  return (
    <Layout title={"Dashboard - Create Category Ecommerce App"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Category</h1>
            <div className="p-3 w-50">
              <CategoryFrom
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            <div className="w-75">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c) => (
                    <tr key={c._id}>
                      <td>{c.name}</td>
                      <td>
                        <button
                          className="btn btn-warning ms-2"
                          onClick={() => {
                            setIsModalOpen(true);
                            setUpdatedName(c.name);
                            setSelected(c);
                          }}
                        >
                          Edit
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            setIsModalOpen2(true);
                            setDeletedId(c._id);
                            setUpdatedName(c.name);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal
              title="Updating"
              onCancel={() => setIsModalOpen(false)}
              footer={null}
              open={isModalOpen}
            >
              <CategoryFrom
                value={updatedName}
                setValue={setUpdatedName}
                handleSubmit={handleUpdate}
              />
            </Modal>

            <Modal
              title="Delete"
              onCancel={() => setIsModalOpen2(false)}
              footer={null}
              open={isModalOpen2}
            >
              <h4>Confirm to Delete : {updatedName}</h4>
              <button
                type="submit"
                className="btn btn-danger"
                onClick={() => handleDelete(deletedId)}
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

export default CreateCategory;
