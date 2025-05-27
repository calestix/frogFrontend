"use client";

import { useState, useEffect } from "react";
import { faker } from "@faker-js/faker";
import { Switch } from "@headlessui/react";
import Pagination from "../../component/Pagination";
import { useRouter } from "next/navigation";
import { apiCall } from "../../utils/ApiCall";
import { Edit, Eye, Plus } from "lucide-react";
import moment from "moment";

export default function Page() {
  const navigate = useRouter();
  const [data, setData] = useState();
  const [state, setState] = useState("");
  const [paginationInfo, setPaginationInfo] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const handleData = async () => {
    try {
      const response = await apiCall(
        `/admin/private/allpurchase?page=${currentPage}&limit=${limit}&status=${state}&month=${month}&year=${year}`,
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
  }, [currentPage, limit, month, year, state]);

  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
  };
  const reset = async () => {
    setCurrentPage(1);
    setLimit(10);
    setYear(""), setMonth(""), setState("");
  };

  const options = [
    { label: "All", value: "" },
    { label: "Order Placed", value: "order_placed" },
    { label: "Order Confirmed", value: "order_confirmed" },
    { label: "Processing", value: "processing" },
    { label: "Shipped", value: "shipped" },
    { label: "In Transit", value: "in_transit" },
    { label: "Out for Delivery", value: "out_for_delivery" },
    { label: "Delivered", value: "delivered" },
    { label: "Delivery Failed", value: "delivery_failed" },
    { label: "Returned", value: "returned" },
    { label: "Refunded", value: "refunded" },
    { label: "Cancelled", value: "cancelled" },
  ];

  return (
    <div className="p-6 mt-0 bg-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-black">Purchase List</h2>
      </div>

      <div className="flex items-center justify-end">
        <div>
          <label className="text-black mb-1">Product Status</label> <br />
          <select
            className="py-2 px-5 mb-3 rounded bg-white border-2 text-black"
            onChange={(e) => setState(e.target.value)}
            value={state}
          >
            {options?.map((item, index) => {
              return (
                <option value={item.value} key={index}>
                  {item.label}
                </option>
              );
            })}
          </select>
        </div>
        <div className="ms-3">
          <label className="text-black mb-1">Limit</label> <br />
          <select
            className="py-2 px-5 mb-3 rounded bg-white border-2 text-black"
            onChange={(e) => setLimit(e.target.value)}
            value={limit}
          >
            <option value="10">10</option>
            <option value="10">20</option>
            <option value="10">30</option>
          </select>
        </div>
        <div className="ms-3">
          <label className="text-black mb-1">Month</label> <br />
          <select
            className="py-2 px-5 mb-3 rounded bg-white border-2 text-black"
            onChange={(e) => setMonth(e.target.value)}
            value={month}
          >
            <option value="">Select</option>
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        </div>
        <div className="ms-3">
          <label className="text-black mb-1">Year</label> <br />
          <select
            className="py-2 px-5 mb-3 rounded bg-white border-2 text-black"
            onChange={(e) => setYear(e.target.value)}
            value={year}
          >
            <option value="">Select</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
            <option value="2027">2027</option>
          </select>
        </div>
      </div>
      <div className=" flex justify-end mb-3">
        <button
          className="px-3 py-1 bg-green-600 rounded text-white"
          onClick={() => reset()}
        >
          Reset
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="border-collapse w-full border-2 rounded-2xl bg-white shadow">
          <thead>
            <tr className="bg-gray-300 text-left text-sm font-semibold text-gray-700">
              <th className="px-4 py-2">S.No</th>
              <th className="px-4 py-2">Product Name(s)</th>
              <th className="px-4 py-2">User Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">PhoneNumber</th>
              <th className="px-4 py-2">City</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">No. of Products</th>
              <th className="px-4 py-2">Order Date</th>
              <th className="px-4 py-2">Order Status</th>
              <th className="px-4 py-2">Payment Status</th>
              <th className="px-4 py-2">View</th>
            </tr>
          </thead>
          <tbody>
            {paginationInfo?.docs?.length > 0 ? (
              paginationInfo.docs.map((item, index) => (
                <tr
                  key={item._id}
                  className="border-b hover:bg-gray-50 text-sm text-gray-800"
                >
                  <td className="px-4 py-2">{index + 1 + limit * (currentPage - 1)}</td>
                  <td className="px-4 py-2  min-w-[300px]">
                    {item.products.map((p) => p.productName).join(`,`)}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">{item?.firstName} {item?.lastName}</td>
                  <td className="px-4 py-2">{item?.email}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{item?.countryCode} {item?.phoneNumber}</td>
                  <td className="px-4 py-2">{item.shippingAddress?.city}</td>
                  <td className="px-4 py-2">₹{item.paymentSummary?.total}</td>
                  <td className="px-4 py-2">{item.products.length}</td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {moment(item?.createdAt).format("LLL")}
                  </td>
                  <td className="px-4 py-2">{item?.orderStatus}</td>
                  <td className="px-4 py-2">{item?.paymentStatus}</td>
                  <td className="px-4 py-2">
                    <button className="px-3 py-1 bg-purple-500 rounded text-white" onClick={()=>navigate.push(`/admin/purchase-product/order-details/${item?._id}`)}>
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="12"
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
