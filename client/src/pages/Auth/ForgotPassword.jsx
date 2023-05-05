import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import "../../styles/AuthStyles.css"
import axios from "axios";


const ForgotPassword = () => {
    const [email, setEmail] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [answer, setAnswer] = useState("")

    
    const navigate = useNavigate();
  
    const handleSubmit = async (e) =>{
      e.preventDefault()
      try {
        const result = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/forget-password`,
        { email , answer , newPassword  });
        if (result && result.data.success ){
          toast.success(result.data && result.data.message)
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
    <Layout title={'Forgot password - Ecommerce APP'}>
      <div className="form-container" style={{ minHeight: "90vh" }}>
        <form onSubmit={handleSubmit} className="w-50  rounded-2 p-4 shadow p-3 m-2 bg-body rounded">
        <h4 className="title">RESET PASSWORD FORM</h4>
          <div class="mb-3">
            <input
              type="email"
              class="form-control"
              id="email"
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
              id="answer"
              placeholder="Enter yoru favorite sports"
              required
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="newPassword"
              placeholder="Enter Your new password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="d-flex gap-4  flex-column">
       
          
          <button type="submit" className="btn btn-primary w-100">
          RESET
          </button>
          </div>
         
        </form>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
