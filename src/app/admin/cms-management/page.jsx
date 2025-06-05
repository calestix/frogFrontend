"use client";
import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";
import { apiCall } from "../../utils/ApiCall";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

function Page() {
  const [cmsType, setCmsType] = useState("privacyPolicy");

  const [data, setData] = useState({
    title: { en: "", ar: "" },
    content: { en: "", ar: "" },
  });

  // Fetch CMS data
  const handleResponse = async () => {
    try {
      const response = await apiCall(`/admin/private/getCms/${cmsType}`, "get");
      const item = response.data[0] || {};
      setData({
        title: {
          en: item.title?.en || "",
          ar: item.title?.ar || "",
        },
        content: {
          en: item.content?.en || "",
          ar: item.content?.ar || "",
        },
      });
    } catch (error) {
      console.error("Failed to fetch CMS data:", error);
    }
  };

  // Trigger on CMS type change
  useEffect(() => {
    handleResponse();
  }, [cmsType]);

  // Save updates
  const handleChange = async () => {
    try {
      await apiCall(`/admin/private/updateCms/${cmsType}`, "patch", data);
      handleResponse();
    } catch (error) {
      console.log("Update failed:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold text-center mb-6 text-purple-800">
        CMS Management
      </h2>

      {/* CMS Page Selection */}
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">
          Select CMS Page
        </label>
        <select
          value={cmsType}
          onChange={(e) => setCmsType(e.target.value)}
          className="w-full p-2 border border-gray-300 text-black rounded-md"
        >
          <option value="privacyPolicy">Privacy Policy</option>
          <option value="termsAndConditions">Terms And Conditions</option>
        </select>
      </div>

      {/* Title EN */}
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">
          Title (English)
        </label>
        <input
          type="text"
          value={data.title.en}
          onChange={(e) =>
            setData((prev) => ({
              ...prev,
              title: { ...prev.title, en: e.target.value },
            }))
          }
          className="w-full p-2 border text-black border-gray-300 rounded-md"
        />
      </div>

      {/* Title AR */}
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">
          Title (Arabic)
        </label>
        <input
          type="text"
          value={data.title.ar}
          onChange={(e) =>
            setData((prev) => ({
              ...prev,
              title: { ...prev.title, ar: e.target.value },
            }))
          }
          className="w-full p-2 border text-black border-gray-300 rounded-md"
          dir="rtl"
        />
      </div>

      {/* Content EN */}
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">
          Content (English)
        </label>
        <div className="border text-black border-gray-300 rounded-md p-1">
          <JoditEditor
            value={data.content.en}
            onBlur={(value) =>
              setData((prev) => ({
                ...prev,
                content: { ...prev.content, en: value },
              }))
            }
          />
        </div>
      </div>

      {/* Content AR */}
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">
          Content (Arabic)
        </label>
        <div className="border text-black border-gray-300 rounded-md p-1">
          <JoditEditor
            value={data.content.ar}
            onBlur={(value) =>
              setData((prev) => ({
                ...prev,
                content: { ...prev.content, ar: value },
              }))
            }
            config={{ direction: "rtl" }}
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="text-right mt-6">
        <button
          className="bg-purple-700 text-white px-6 py-2 rounded hover:bg-purple-800 transition"
          onClick={handleChange}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default Page;
