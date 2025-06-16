"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { apiCall } from "../../utils/ApiCall";
import { motion } from "framer-motion";
import Navbar from "@/src/app/component/navbar/nav";
import Footer from "@/src/app/component/footer/footer";
import Head from "next/head";
function Page() {
  const navigate = useRouter();
  const { id } = useParams();
  const [data, setData] = useState();
  const getdata = async () => {
    try {
      const res = await apiCall(`/user/getBlog/${id}`, "get");
      setData(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getdata();
  }, []);

  return (
    <>
     <Head>
        <title>{data?.title} - FORGE Blog</title>
        <meta name="description" content={data?.title} />
        <meta property="og:title" content={data?.title} />
        <meta property="og:description" content={data?.description} />
      </Head>
    <Navbar/>
    <div className="mt-20 blog-details">
      <motion.div
        className="max-w-5xl mx-auto my-10 p-6 bg-white rounded-2xl shadow-lg space-y-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          {data?.title}
        </h1>
        {/* Banner */}
        <div className="relative w-full h-64 md:h-96 overflow-hidden rounded-xl">
          <img
            src={`https://forgetradingandconstruction.com/api/api/assets/get-asset?path=${encodeURIComponent(
              data?.bannerImg
            )}`}
            alt={data?.title}
            className="object-cover"
          />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {data?.tags?.map((tag, i) => (
            <span
              key={i}
              className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-semibold"
            >
              #{tag?.trim()}
            </span>
          ))}
        </div>

        {/* Content */}
        <div
          className="prose prose-lg max-w-none prose-h4:text-xl prose-p:text-gray-800"
          dangerouslySetInnerHTML={{ __html: data?.content }}
        ></div>
      </motion.div>
    </div>
    <Footer/>
    </>
    
  );
}

export default Page;
