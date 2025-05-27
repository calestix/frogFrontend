"use client";
import React, { useEffect, useState } from "react";
import { apiCall } from "../../utils/ApiCall";

function Page() {
  const [allTax, setAllTax] = useState([]);
  const [selectedTax, setSelectedTax] = useState(null);
  const [newValue, setNewValue] = useState("");

  useEffect(() => {
    handleResponse();
  }, []);

  const handleResponse = async () => {
    try {
      const { data } = await apiCall("/admin/private/findAllTaxes", "get");
      setAllTax(data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateTax = async () => {
    try {
      await apiCall(`/admin/private/updateTax/${selectedTax._id}`, "patch", {
        value: newValue,
      });
      setSelectedTax(null);
      handleResponse(); // Refresh data
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">All Tax</h1>
      <div className="bg-white rounded shadow p-4">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-200 text-left text-gray-700">
              <th className="p-2">#</th>
              <th className="p-2">Name</th>
              <th className="p-2">Value</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allTax.map((tax, index) => (
              <tr key={tax._id} className="border-b">
                <td className="p-2">{index + 1}</td>
                <td className="p-2 capitalize">{tax.name}</td>
                <td className="p-2">{tax.value}</td>
                <td className="p-2">
                  <button
                    onClick={() => {
                      setSelectedTax(tax);
                      setNewValue(tax.value);
                    }}
                    className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedTax && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Edit {selectedTax.name} Tax
            </h2>
            <input
              type="number"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setSelectedTax(null)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={updateTax}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;
