import React , { useState }from "react";
import axios from "axios";
import { useLocation, useNavigate } from 'react-router-dom'
import Layout from "../../components/Layout/Layout";
import toast from 'react-hot-toast'
import "../../styles/AuthStyles.css"
import { useAuth } from "../../context/auth";

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [auth , setAuth] = useAuth()

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) =>{
    e.preventDefault()
    try {
      const result = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`,
      { email , password  });
      if (result && result.data.success ){
        toast.success(result.data.message)
        setAuth({
          ...auth,
          user : result.data.user,
          token : result.data.token,
        })

        localStorage.setItem('auth' , JSON.stringify(result.data))

        navigate( location.state || '/')
      }else{
        toast.error(result.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error("Somthing went wrong!!")
      
    }
}
  return (
    <Layout>
      <div className="form-container " style={{ minHeight: "90vh" }}>
        <form onSubmit={handleSubmit} className="w-50  rounded-2 p-4 shadow p-3 m-2 bg-body rounded">
        <h4 className="title">LOGIN FORM</h4>
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
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter Your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="d-flex gap-4  flex-column">
          <button type="button" className="btn btn-primary w-100" onClick={ () => { navigate(`/forgot-password`) } }>
          FORGOT PASSWORD
          </button>
          
          <button type="submit" className="btn btn-primary w-100">
          LOGIN
          </button>
          </div>
         
        </form>
      </div>
    </Layout>
  )
}

export default Login