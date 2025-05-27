"use client";
import dynamic from "next/dynamic";
import React, { useState, useEffect, useRef } from "react";
import { apiCall } from "../../utils/ApiCall";
import FileUpload from "../../utils/upload";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
const MAX_SIZE = 10 * 1024 * 1024; // 10MB

function Page() {
  const [cmsType, setCmsType] = useState("shippingPolicy");
  const [data, setData] = useState({ title: "", content: "", image: "",videoLink:"" });
  const [bannerImg, setBannerImages] = useState([]);
  const fileInputRef = useRef(null);

  const handleResponse = async () => {
    try {
      const response = await apiCall(`/admin/private/getCms/${cmsType}`, "get");
      if (cmsType === "bannerImg") {
        setBannerImages(response.data[0]?.bannerImg || []);
      } else {
        setData({
          title: response.data[0]?.title || "",
          content: response.data[0]?.content || "",
          image: response.data[0]?.image || "",
        });
      }
    } catch (error) {
      console.error("Failed to fetch CMS data:", error);
    }
  };

  useEffect(() => {
    handleResponse();
  }, [cmsType]);

  const handleChange = async () => {
    try {
      await apiCall(`/admin/private/updateCms/${cmsType}`, "patch", data);
      handleResponse();
    } catch (error) {
      console.log("Update failed:", error);
    }
  };

  const handleBannerImg = async () => {
    try {
      await apiCall(`/admin/private/updateCms/${cmsType}`, "patch", {
        bannerImg: bannerImg,
      });
      handleResponse();
    } catch (error) {
      console.log("Banner image update failed:", error);
    }
  };

  const handleFileChange = async (e) => {
    const img = e.target.files[0];
    if (img) {
      const uploaded = await FileUpload(img);
      setData((prev) => ({ ...prev, image: uploaded }));
    }
  };

  const handleFileChanges = async (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter((file) => {
      if (!ALLOWED_TYPES.includes(file.type)) {
        alert("Invalid file type");
        return false;
      }
      if (file.size > MAX_SIZE) {
        alert("File exceeds 3MB");
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    try {
      const uploadPromises = validFiles.map((file) => FileUpload(file));
      const uploadedFilenames = await Promise.all(uploadPromises);
      setBannerImages((prev) => [...prev, ...uploadedFilenames]);
    } catch (err) {
      console.error("Upload failed", err);
      alert("Image upload failed. Please try again.");
    }
  };

  const handleRemove = (indexToRemove) => {
    const updatedImages = bannerImg.filter((_, i) => i !== indexToRemove);
    setBannerImages(updatedImages);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold text-center mb-6 text-purple-800">
        CMS Management
      </h2>

      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">
          Select CMS Page
        </label>
        <select
          value={cmsType}
          onChange={(e) => setCmsType(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="shippingPolicy">Shipping Policy</option>
          <option value="refund">Refund Policy</option>
          <option value="privacyPolicy">Privacy Policy</option>
          <option value="termsAndConditions">Terms And Conditions</option>
          <option value="aboutUs">About Us</option>
          <option value="bannerImg">Banner Images</option>
        </select>
      </div>

      {cmsType !== "bannerImg" && (
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Title</label>
          <input
            type="text"
            value={data?.title}
            onChange={(e) =>
              setData((prev) => ({ ...prev, title: e.target.value }))
            }
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
      )}

      {cmsType === "aboutUs" && (
        <>
         <div className="relative group w-40 h-40 mb-6">
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
            {data?.image ? (
              <img
                src={`https://brajkunjseva.com/api/assets/get-asset?path=${encodeURIComponent(
                  data?.image
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
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Video link</label>
          <input
            type="text"
            value={data?.videoLink}
            onChange={(e) =>
              setData((prev) => ({ ...prev, videoLink: e.target.value }))
            }
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        </>
       
        
      )}

      {cmsType !== "bannerImg" && (
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Description
          </label>
          <div className="border border-gray-300 rounded-md p-1">
            <JoditEditor
              value={data?.content}
              onBlur={(value) =>
                setData((prev) => ({ ...prev, content: value }))
              }
            />
          </div>
        </div>
      )}

      {cmsType === "bannerImg" && (
        <div className="w-full bg-white shadow-md rounded-2xl p-6">
          <label className="block text-gray-700 font-semibold mb-2">
            Banner Images
          </label>
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-purple-400 rounded-xl w-full h-44 flex items-center justify-center bg-purple-50 cursor-pointer hover:bg-purple-100 transition-colors"
          >
            <div className="text-center text-purple-700">
              <div className="text-4xl">📤</div>
              <p className="mt-2 text-sm">Click or drag files here to upload</p>
              <p className="text-xs text-gray-500 mt-1">JPEG, PNG, GIF up to 3MB</p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChanges}
              className="hidden"
            />
          </div>

          <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 gap-4">
            {bannerImg?.map((src, idx) => (
              <div
                key={idx}
                className="relative group rounded-xl overflow-hidden border-2 border-purple-200 hover:shadow-lg transition-shadow"
              >
                <img
                  src={`https://brajkunjseva.com/api/assets/get-asset?path=${encodeURIComponent(
                    src
                  )}`}
                  alt={`preview-${idx}`}
                  className="w-full h-32 object-cover"
                />
                <div
                  onClick={() => handleRemove(idx)}
                  className="absolute top-0 right-0 bg-red-600 bg-opacity-80 text-white text-xs px-2 py-1 rounded-bl-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
                >
                  ✖
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="text-right mt-6">
        <button
          className="bg-purple-700 text-white px-6 py-2 rounded hover:bg-purple-800 transition"
          onClick={cmsType === "bannerImg" ? handleBannerImg : handleChange}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default Page;
