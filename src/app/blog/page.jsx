"use client";
import React, { useEffect, useState } from "react";
import Footer from "../component/footer/footer";
import Navbar from "../component/navbar/nav";
import { apiCall } from "../utils/ApiCall";
import Pagination from "../component/Pagination";
import { useRouter } from "next/navigation";
function Blog() {
  const navigate = useRouter();
  const [data, setData] = useState([]);
  const [paginationInfo, setPaginationInfo] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const response = async () => {
    try {
      const res = await apiCall("/user/getBlog", "get");
      setData(res?.data?.docs);
      setPaginationInfo(res?.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    response();
  }, [currentPage, limit]);
  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
  };

  return (
    <>
     <head>
        <title>Blog - FORGE Trading and Construction</title>
        <meta name="description" content="Latest news and articles about construction and repair services by Forge." />
      </head>
      <Navbar />
      <div className="min-h-screen py-20 md:px-20 px-8">
        <div className="flex justify-center mb-8">
          <h3 className="text-4xl heading text-center mt-4 text-white font-bold">
            Blog
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-8">
          {data?.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition duration-500 hover:scale-[1.02] hover:shadow-2xl group"
            >
              {/* Image with overlay */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={`https://forgetradingandconstruction.com/api/api/assets/get-asset?path=${encodeURIComponent(
                    item?.bannerImg
                  )}`}
                  alt={item?.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/30 z-10" />
                <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent text-white z-20">
                  <h4 className="text-xl font-semibold text-white">
                    {item?.title}
                  </h4>
                </div>
              </div>

              {/* Card body */}
              <div className="p-5 bg-white flex flex-col justify-between h-[220px]">
                <div
                  className="text-gray-700 text-sm leading-relaxed line-clamp-4 mb-4"
                  dangerouslySetInnerHTML={{ __html: item?.content }}
                />
                <button
                  className="mainButton"
                  onClick={() => navigate.push(`/blog/view/${item?._id}`)}
                >
                  View Blog
                </button>
              </div>
            </div>
          ))}
        </div>

        <Pagination
          page={paginationInfo?.page}
          totalPages={paginationInfo?.totalPages}
          hasNextPage={paginationInfo?.hasNextPage}
          hasPrevPage={paginationInfo?.hasPrevPage}
          onPageChange={handlePageChange}
        />
      </div>

      <Footer />
    </>
  );
}

export default Blog;
