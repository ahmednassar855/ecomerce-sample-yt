import { useState , useEffect } from "react";
import axios from "axios";

export default function useCategory () {
    const [ allCategories , setAllCategories ] = useState([])
    // get categoris
    const getCategries = async () => {
        try {
           const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-categories`) 
           console.log(data); 
           setAllCategories(data?.categories)

            console.log('categories' , allCategories , data?.categories);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {    
      getCategries()
    }, [])

    return allCategories;
}