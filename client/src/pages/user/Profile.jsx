import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";
import { toast } from "react-hot-toast";
import axios from "axios";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [auth, setAuth] = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/profile`,
        { name, email, password, phone, address }
      );
      if (data?.error){
        toast.error(data?.error)
      }else{
        setAuth({ ...auth , user : data?.updatedUser })
        let ls = localStorage.getItem("auth")
        ls = JSON.parse(ls)
        ls.user = data.updatedUser
        localStorage.setItem('auth' , JSON.stringify(ls))
        toast.success("Profile updated successfully")
      }
    } catch (error) {
      console.log(error);
      toast.error("Somthing went wrong!!");
    }
  };

  // get user data
  useEffect(() => {
    const { email , name , phone , address  } = auth?.user;
    setName(name)
    setPhone(phone)
    setEmail(email)
    setAddress(address)
  }, [auth?.user])
  
  return (
    <Layout title={"Your Profle"}>
      <div className="container m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div>
              <div className="form-container" style={{ minHeight: "90vh" }}>
                <form
                  onSubmit={handleSubmit}
                  className="w-50  rounded-2 p-4 shadow p-3 m-2 bg-body rounded"
                >
                  <h4 className="title">PROFILE FORM</h4>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      placeholder="Enter Your name"
                      autoFocus
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder="Enter yoru email"
                      disabled
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="phone"
                      name="phone"
                      placeholder="Enter your phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      name="address"
                      placeholder="Enter Your address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      placeholder="Enter Your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary">
                    Update
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
