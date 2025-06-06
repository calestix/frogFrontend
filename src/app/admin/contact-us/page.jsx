"use client";

import { useState, useEffect } from "react";
import { Switch } from "@headlessui/react";
import Pagination from "../../component/Pagination";
import { useRouter } from "next/navigation";
import { apiCall } from "../../utils/ApiCall";
import { Edit, Eye, Plus } from "lucide-react";
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
        `/admin/private/contactUs?page=${currentPage}&limit=${limit}`,
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

  return (
    <div className="p-6 mt-0 bg-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-black">Contact List</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="border-collapse w-full border-2 rounded-2xl bg-white shadow">
          <thead>
            <tr className="bg-gray-300 text-left text-sm font-semibold text-gray-700">
              <th className="px-4 py-2">S.No</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Phone Number</th>
              <th className="px-4 py-2">Message</th>
              <th className="px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {paginationInfo?.docs?.length > 0 ? (
              paginationInfo.docs.map((item, index) => (
                <tr
                  key={item?.id}
                  className="border-b hover:bg-gray-50 text-sm text-gray-800"
                >
                  <td className="px-4 py-2">{index + 1 + limit * (currentPage - 1)}</td>
                  <td className="px-4 py-2 min-w-[250px]">
                    {item?.fullName}
                  </td>
                  <td className="px-4 py-2 min-w-[150px]">{item?.email}</td>
                  <td className="px-4 py-2">
                    {item?.countryCode} {item?.phoneNumber}
                  </td>
                  <td className="px-4 py-2">{item?.message}</td>
                  <td className="px-4 py-2">
                    {moment(item?.createdAt).format("DD-MM-YYYY")}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
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
