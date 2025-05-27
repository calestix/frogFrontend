"use client";

import { useState, useEffect } from "react";
import { Switch } from "@headlessui/react";
import Pagination from "../../component/Pagination";
import { useRouter } from "next/navigation";
import { apiCall } from "../../utils/ApiCall";
import moment from "moment";

export default function Page() {
  const navigate = useRouter();
  const [data, setData] = useState();
  const [paginationInfo, setPaginationInfo] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [status, setStatus] = useState("active");
  const handleData = async () => {
    try {
      const response = await apiCall(
        `/admin/private/accountMngt?page=${currentPage}&limit=${limit}&status=${status}`,
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
  }, [currentPage, limit, status]);
  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
  };

  const handleToggleStatus = async (id, status) => {
    try {
      await apiCall(
        `/admin/private/changeStatus/${id}?status=${status}`,
        "patch"
      );
      handleData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6 mt-0 bg-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-black">User List</h2>
        <select
          className="border rounded px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2"
          onChange={(e) => setStatus(e.target.value)}
          value={status}
        >
          <option value="active" className="bold">
            Active
          </option>
          <option value="blocked" className="bold">
            Blocked
          </option>
        </select>
      </div>

      <div>
        <div className="overflow-x-auto w-full">
          <table className="border-collapse border-2 w-full rounded-2xl bg-white shadow">
            <thead>
              <tr className="bg-gray-300 text-left text-sm font-semibold text-gray-700">
                <th className="px-4 py-2">S.No</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Phone Number</th>
                <th className="px-4 py-2">Gender</th>
                <th className="px-4 py-2">Join Date</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">View Profile</th>
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
                    <td className="px-4 py-2 whitespace-nowrap">
                      {item?.firstName} {item?.lastName}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      {item?.email}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      {item?.countryCode} {item?.phoneNumber}
                    </td>
                    <td className="px-4 py-2">{item?.gender}</td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      {moment(item?.createdAt).format("DD-MM-YYYY")}
                    </td>
                    <td className="px-4 py-2">
                      <Switch
                        checked={item?.status === "active"}
                        onChange={() =>
                          handleToggleStatus(item?._id, item?.status)
                        }
                        className={`${
                          item?.status === "blocked"
                            ? "bg-red-500"
                            : "bg-green-500"
                        } relative inline-flex h-6 w-11 items-center rounded-full transition`}
                      >
                        <span
                          className={`${
                            item?.status === "blocked"
                              ? "translate-x-1"
                              : "translate-x-6"
                          } inline-block h-4 w-4 transform bg-white rounded-full transition`}
                        />
                      </Switch>
                    </td>
                    <td className="flex px-4 py-2">
                      <button
                        className="bg-purple-600 mr-1.5 whitespace-nowrap hover:bg-purple-700 text-white px-3 py-1 rounded text-sm"
                        onClick={() =>
                          navigate.push(
                            `/admin/account-management/view-profile/${item?._id}`
                          )
                        }
                      >
                        View Profile
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center text-gray-500 py-6">
                    No data found
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
    </div>
  );
}
