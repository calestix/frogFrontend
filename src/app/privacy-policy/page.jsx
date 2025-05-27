"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../component/navbar/nav";
import Footer from "../component/footer/footer";
import { apiCall } from "../utils/ApiCall";

function Page() {
  const [data, setData] = useState();
  const handleResponse = async () => {
    try {
      const { data } = await apiCall("/user/getCms/privacyPolicy", "get");
      setData(data[0]);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleResponse();
  }, []);
  return (
    <>
      <Navbar />
      <section className="main-bg pt-25 pb-3">
        <div className="text-center ">
          <h4 className="heading py-4">{data?.title}</h4>
        </div>
        <div className="content-page px-24">
          <div
            className=""
            dangerouslySetInnerHTML={{ __html: data?.content }}
          />
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Page;
