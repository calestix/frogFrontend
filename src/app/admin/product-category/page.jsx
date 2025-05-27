"use client";

import { useState, useEffect, useRef } from "react";
import { Plus, Edit, Delete } from "lucide-react";
import { useRouter } from "next/navigation";
import Pagination from "../../component/Pagination";
import Modal from "../../component/ProductModel";
import { apiCall } from "../../utils/ApiCall";
import FileUpload from "../../utils/upload";

export default function MyProduct() {
    const fileInputRef = useRef(null);
  const navigate = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [paginationInfo, setPaginationInfo] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [image,setImage]=useState("")
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState([""]);
  const [editingId, setEditingId] = useState(null);

  const handleData = async () => {
    try {
      const response = await apiCall(
        `/admin/private/getAllCategory?page=${currentPage}&limit=${limit}`,
        "get"
      );
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

  const handleDelete = async (id) => {
    try {
      await apiCall(`/admin/private/deleteCategory/${id}`, "delete");
      handleData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = { category, subCategory,image };
      if (editingId) {
        await apiCall(`/admin/private/updateCategory/${editingId}`, "patch", formData);
      } else {
        await apiCall("/admin/private/createCategory", "post", formData);
      }
      setModalOpen(false);
      setCategory("");
      setSubCategory([""]);
      setImage("")
      setEditingId(null);
      handleData();
    } catch (error) {
      console.log(error);
    }
  };

   const handleFileChange = async (e) => {
    const img = e.target.files[0];
    
    if (img) {
      const data = await FileUpload(img);
      setImage(data);
    }
  };

  return (
    <div className="p-6">
      <div className="md:flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">All Category List</h1>
        <button
          onClick={() => {
            setCategory("");
            setSubCategory([""]);
            setEditingId(null);
            setModalOpen(true);
          }}
          className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
        >
          <Plus className="mr-1" /> Add Category
        </button>
      </div>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100 text-sm font-semibold text-gray-700">
              <th className="px-6 py-3 text-left">S.No</th>
              <th className="px-6 py-3 text-left">Category</th>
              <th className="px-6 py-3 text-left">Sub Categories</th>
              <th className="px-6 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginationInfo?.docs?.map((item, index) => (
              <tr
                key={item?._id}
                className="border-b text-sm text-gray-800 hover:bg-gray-50"
              >
                <td className="px-6 py-3">{index + 1 + limit * (currentPage - 1)}</td>
                <td className="px-6 py-3">{item?.category}</td>
                <td className="px-6 py-3">
                  {item?.subCategory?.length
                    ? item.subCategory.join(", ")
                    : "—"}
                </td>
                <td className="px-6 py-3 flex space-x-2">
                  <button
                    onClick={() => {
                      setCategory(item?.category);
                      setSubCategory(item?.subCategory?.length ? item.subCategory : [""]);
                      setEditingId(item?._id);
                      setModalOpen(true);
                      setImage(item?.image)
                    }}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1.5 rounded text-sm"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded text-sm"
                  >
                    <Delete size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            {editingId ? "Edit Category" : "Add Category"}
          </h2>
          <div className="relative group w-40 h-40 my-4 text-center">
            <input
              ref={fileInputRef}
              type="file"
              accept=".jpeg,.jpg,.png,.gif"
              className="hidden"
              onChange={handleFileChange}
            />
            <div
              onClick={() => fileInputRef.current.click()}
              className="w-full h-full rounded-full border-4 border-dashed border-gray-300 hover:border-purple-500 cursor-pointer flex items-center justify-center bg-gray-100 overflow-hidden"
            >
              {image ? (
                <img
                  src={`https://brajkunjseva.com/api/assets/get-asset?path=${encodeURIComponent(
                    image
                  )}`}
                  alt="Preview"
                  className="object-cover w-full h-full rounded-full"
                />
              ) : (
                <div className="text-center text-sm text-gray-600 px-2">
                  <span className="text-lg">📷</span>
                  <p className="text-xs">Update photo</p>
                </div>
              )}
            </div>
          </div>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Enter category name"
            className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {subCategory.map((sub, idx) => (
            <div key={idx} className="flex items-center space-x-2 mb-2">
              <input
                type="text"
                value={sub}
                onChange={(e) => {
                  const updated = [...subCategory];
                  updated[idx] = e.target.value;
                  setSubCategory(updated);
                }}
                placeholder={`Subcategory ${idx + 1}`}
                className="flex-grow border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                onClick={() => {
                  const updated = subCategory.filter((_, i) => i !== idx);
                  setSubCategory(updated.length ? updated : [""]);
                }}
                className="text-red-600 hover:text-red-800"
              >
                ✕
              </button>
            </div>
          ))}

          <button
            onClick={() => setSubCategory([...subCategory, ""])}
            className="mb-4 text-blue-600 hover:underline text-sm"
          >
            + Add Subcategory
          </button>

          <div className="flex justify-end space-x-2">
            <button
              onClick={() => {
                setModalOpen(false);
                setCategory("");
                setSubCategory([""]);
                setEditingId(null);
              }}
              className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
            >
              {editingId ? "Update" : "Create"}
            </button>
          </div>
        </div>
      </Modal>

      {/* Pagination */}
      <div className="mt-6">
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
