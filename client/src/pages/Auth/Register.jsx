import React , { useState }from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import Layout from "../../components/Layout/Layout";
import toast from 'react-hot-toast'
import "../../styles/AuthStyles.css"

const Register = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [answer, setAnswer] = useState("")


    const navigate = useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault()
        try {
          const result = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`,
          { name , email , password , phone , address , answer });
          if (result && result.data.success ){
            toast.success(result.data.message)
            navigate('/login')
          }else{
            toast.error(result.data.message)
          }
        } catch (error) {
          console.log(error);
          toast.error("Somthing went wrong!!")
          
        }
    }
  return (
    <Layout title={"Registration - Ecommerce App"}>
      <div className="form-container" style={{ minHeight: "90vh" }}>
        <form onSubmit={handleSubmit} className="w-50  rounded-2 p-4 shadow p-3 m-2 bg-body rounded">
        <h4 className="title">REGISTER FORM</h4>
        <div class="mb-3">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              placeholder="Enter Your name"
              required
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
              required
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
              required
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
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="answer"
              name="answer"
              placeholder="What is Your Favorite sports?"
              required
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Enter Your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <button type="submit" className="btn btn-primary">
          REGISTER
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
