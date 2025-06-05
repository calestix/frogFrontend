"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { apiCall } from "../../utils/ApiCall";
import Pagination from "../../component/Pagination";
import { Delete, PencilLine } from "lucide-react";
import moment from "moment";

export default function Page() {
  const navigate = useRouter();
  const [data, setData] = useState();
  const [paginationInfo, setPaginationInfo] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const handleData = async () => {
    try {
      const response = await apiCall(
        `/admin/private/getAllBlog?page=${currentPage}&limit=${limit}`,
        "get"
      );
      setData(response?.data?.docs);
      setPaginationInfo(response?.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleData();
  }, [currentPage, limit]);
  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
  };

  const handleDelete=async(id)=>{
    try {
      await apiCall(`/admin/private/deleteblog/${id}`,"delete")
      handleData()
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="p-6 mt-0 bg-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold text-black">Blog</h2>
        <button
          className="addbtn"
          onClick={() => navigate.push("/admin/blog/AddBlog")}
        >
          Add Blog
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="border-collapse w-full border-2 rounded-2xl bg-white shadow">
          <thead>
            <tr className="bg-gray-300 text-left text-sm font-semibold text-gray-700">
              <th className="px-4 py-2">S.No</th>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">slug</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginationInfo?.docs?.length > 0 ? (
              paginationInfo.docs.map((item, index) => (
                <tr
                  key={item?._id}
                  className="border-b hover:bg-gray-50 text-sm text-gray-800"
                >
                  <td className="px-4 py-2">
                    {index + 1 + limit * (currentPage - 1)}
                  </td>
                  <td className="px-4 py-2 min-w-[250px]">{item?.title}</td>
                  <td className="px-4 py-2">{item?.slug}</td>
                  <td className="px-4 py-2">
                    {moment(item?.createdAt).format("DD-MM-YYYY")}
                  </td>
                  <td className="px-4 py-2">
                    <button className="me-4" onClick={()=>navigate.push(`/admin/blog/editBlog/${item?._id}`)}>
                      <PencilLine />
                    </button>
                    <button onClick={()=>handleDelete(item?._id)}>
                      <Delete />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr key={1}>
                <td
                  colSpan="6"
                  className="px-4 py-8 text-center text-gray-500 text-sm"
                >
                  No data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        page={paginationInfo?.page}
        totalPages={paginationInfo?.totalPages}
        hasNextPage={paginationInfo?.hasNextPage}
        hasPrevPage={paginationInfo?.hasPrevPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
