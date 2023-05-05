import React from 'react'
import Layout from '../components/Layout/Layout'
import { useSearch } from '../context/search'

const SearchPage = () => {
    const [values , setValues] = useSearch()
    console.log(values);
    console.log(values.results.results.length);
  return (
    <Layout title={"search result"}>
    
    <div className='container'>
        <div className='text-center'>
            <h1>Search results</h1>
            <h6>{values?.results.results.length < 1 ?  " No product found" : `Found ${values?.results.results.length }`}</h6>
        </div>
        <div className="row text-center">
            {values?.results.results?.map((p) => (
              <div
              // key={p._id}
                className="col-4 card m-2 p-4 shadow-lg"
                style={{ width: "300px", height: "300px" }}
              >
                <img
                  src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top w-100 h-100"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <h5 className="card-title">$ {p.price}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                </div>
                <div className="d-flex gap-4">
                  <button className="btn btn-primary">See Details</button>
                  <button className="btn btn-secondary">Add To Cart</button>
                </div>
              </div>
            ))}
          </div>
    </div> 

    </Layout>
  ) 
}

export default SearchPage