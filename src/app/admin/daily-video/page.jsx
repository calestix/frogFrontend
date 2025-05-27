"use client";

import { useState, useEffect, useRef } from "react";
import { Plus, Edit, Delete } from "lucide-react";
import { useRouter } from "next/navigation";
import Pagination from "../../component/Pagination";
import Modal from "../../component/ProductModel";
import { apiCall } from "../../utils/ApiCall";
import moment from "moment";

export default function MyProduct() {
  const navigate = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [paginationInfo, setPaginationInfo] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [link, setLink] = useState("");
  const [editingId, setEditingId] = useState(null);

  const handleData = async () => {
    try {
      const response = await apiCall(
        `/admin/private/findAllVideo?page=${currentPage}&limit=${limit}`,
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
      await apiCall(`/admin/private/DeleteVideo/${id}`, "delete");
      handleData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = { link };
      if (editingId) {
        await apiCall(`/admin/private/updateVideo/${editingId}`, "patch", formData);
      } else {
        await apiCall("/admin/private/createVideo", "post", formData);
      }
      setModalOpen(false);
      setLink("");
      setEditingId(null);
      handleData();
    } catch (error) {
      console.log(error);
    }
  };

  
  return (
    <div className="p-6">
      <div className="md:flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">All Daily List</h1>
        <button
          onClick={() => {
            setLink("");
            setEditingId(null);
            setModalOpen(true);
          }}
          className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
        >
          <Plus className="mr-1" /> Add Daily Video
        </button>
      </div>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100 text-sm font-semibold text-gray-700">
              <th className="px-6 py-3 text-left">S.No</th>
              <th className="px-6 py-3 text-left">Date</th>
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
                <td className="px-6 py-3">{moment(item?.createdAt).format('LLL')}</td>
                <td className="px-6 py-3 flex space-x-2">
                  <button
                    onClick={() => {
                      setLink(item?.link);
                      setEditingId(item?._id);
                      setModalOpen(true);
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
            {editingId ? "Edit Daily Link" : "Add Daily link"}
          </h2>
          <input
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="Enter link"
            className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => {
                setModalOpen(false);
                setLink("");
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
