"use client";

import { useState, useEffect } from "react";
import { faker } from "@faker-js/faker";
import { Switch } from "@headlessui/react";
import Pagination from "../../component/Pagination";
import { useRouter } from "next/navigation";
import { apiCall } from "../../utils/ApiCall";
import { DeleteIcon, Edit, Eye, Plus } from "lucide-react";

export default function MyProduct() {
  const navigate = useRouter();
  const [allProducts, setAllProducts] = useState();
  const [paginationInfo, setPaginationInfo] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleData = async () => {
    try {
      const response = await apiCall(
        `/admin/private/get-product?page=${currentPage}&limit=${limit}`,
        "get"
      );
      setAllProducts(response?.data?.docs);
      setPaginationInfo(response?.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleData();
  }, [currentPage, limit]);

  const handleToggleStatus = (id) => {
    setAllProducts((prev) =>
      prev.map((product) =>
        product.id === id
          ? { ...product, status: product.status === "show" ? "hide" : "show" }
          : product
      )
    );
  };

  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
  };

  const handleDelete=async(id)=>{
    try {
      await apiCall(`/admin/private/deleteProduct/${id}`,"delete")
      handleData()
    } catch (error) {
      
    }
  }
  return (
    <div className="p-6 mt-0">
      <div className="md:flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-black">My Product List</h1>
        <div className="flex space-x-4 md:mt-0 mt-3">
          <button
            onClick={() =>
              navigate.push("/admin/product-management/add-product")
            }
            className="bg-blue-500 flex items-center hover:bg-blue-600 text-white px-4 py-2 rounded text-sm"
          >
           <Plus /> Add Product
          </button>
          
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="border-collapse border-2 rounded-2xl bg-white shadow">
          <thead>
            <tr className="bg-gray-300 text-left text-sm font-semibold text-gray-700">
              <th className="px-4 py-2">S.No</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Stock</th>
              <th className="px-4 py-2">Original Price</th>
              <th className="px-4 py-2">Discount</th>
              <th className="px-4 py-2">Final Price</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginationInfo?.docs?.map((product, index) => (
              <tr
                key={product?.id}
                className="border-b hover:bg-gray-50 text-sm text-gray-800"
              >
                <td className="px-4 py-2">{index + 1 + limit * (currentPage - 1)}</td>
                <td className="px-4 py-2 min-w-[250px]">{product?.productName}</td>
                <td className="px-4 py-2 min-w-[150px]">{product?.category}</td>
                <td className="px-4 py-2">{product?.stock}</td>
                <td className="px-4 py-2">{product?.originalPrice}</td>
                <td className="px-4 py-2">{product?.offerPercentage}%</td>
                <td className="px-4 py-2">{product?.finalPrice}</td>
                <td className="px-4 py-2">
                  <Switch
                    checked={product?.status === "show"}
                    onChange={() => handleToggleStatus(product?.id)}
                    className={`${
                      product.status === "hide" ? "bg-red-500" : "bg-green-500"
                    } relative inline-flex h-6 w-11 items-center rounded-full transition`}
                  >
                    <span
                      className={`${
                        product?.status === "hide"
                          ? "translate-x-1"
                          : "translate-x-6"
                      } inline-block h-4 w-4 transform bg-white rounded-full transition`}
                    />
                  </Switch>
                </td>
                <td className="flex px-4 py-2">
                  <button
                    className="bg-purple-600 mr-1.5 hover:bg-purple-700 text-white px-3 py-1 rounded text-sm"
                    onClick={() =>
                      navigate.push(
                        `/admin/product-management/edit-product/${product?._id}`
                      )
                    }
                  >
                    <Edit />
                  </button>
                  <button className="bg-purple-600 hover:bg-purple-700 mr-1.5 text-white px-3 py-1 rounded text-sm">
                    <Eye />
                  </button>
                  <button onClick={()=>handleDelete(product?._id)} className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-sm">
                    <DeleteIcon/>
                  </button>
                </td>
              </tr>
            ))}
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
