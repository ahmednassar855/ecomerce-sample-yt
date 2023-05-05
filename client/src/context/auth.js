import axios from 'axios';
import { useState, useEffect, useContext, createContext } from 'react'


const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        user: null,
        token: "",
    });

    //  defualt axios
    axios.defaults.headers.common["Authorization"] = auth?.token;

    useEffect(() => {
      const data = localStorage.getItem('auth')
      if(data){
        const parsData = JSON.parse(data);
        setAuth({
            ...auth,
            user :parsData.user,
            token : parsData.token,
        })
      }
    }, [])
    
    return (

        <AuthContext.Provider value={[auth, setAuth]} >
            {children}
        </AuthContext.Provider>
    )
}
// custom hook
const useAuth = () => useContext(AuthContext)

export { useAuth, AuthProvider }