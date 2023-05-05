import React from 'react'
import Layout from '../components/Layout/Layout'
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";


const Contact = () => {
  return (
    <Layout title={"contact us - Ecommerce"}>
        <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/contactus.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
          <p className="text-justify mt-2">
            any query and info about product feel free to call anytime we 24 X 7
            avaialible
          </p>
          <p className="mt-3">
            <BiMailSend /> : www.help@ecommerceapp.com
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : 012-70363337
          </p>
          <p className="mt-3">
            <BiSupport /> : 01025335900 (toll free)
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default Contact