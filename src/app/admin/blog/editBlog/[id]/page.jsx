"use client";
import React, { useState, useRef, useEffect } from "react";
import { useFormik } from "formik";
import { AddblogvalidationSchema } from "../../../../utils/validation";
import dynamic from "next/dynamic";
import { apiCall } from "../../../../utils/ApiCall";
import FileUpload from "../../../../utils/upload";
import { useParams, useRouter } from "next/navigation";
import { CircleArrowLeft } from "lucide-react";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
const MAX_SIZE = 10 * 1024 * 1024; // 10MB

export default function EditBlogForm() {
  const navigate = useRouter();
  const { id } = useParams();
  const [bannerImg, setBannerImg] = useState("");
  const fileInputRef = useRef(null);
  const [data, setData] = useState({
    title: { en: "", ar: "" },
    slug: { en: "", ar: "" },
    authorId: "",
    bannerImg: "",
    content: { en: "", ar: "" },
    tags: [{ en: "", ar: "" }],
  });

  const getdata = async () => {
    try {
      const res = await apiCall(`/admin/private/getBlog/${id}`, "get");
      setData(res.data);
      if (res.data.bannerImg) {
        setBannerImg(res.data.bannerImg);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const formik = useFormik({
    initialValues: data,
    enableReinitialize: true,
    validationSchema: AddblogvalidationSchema,
    onSubmit: async (values) => {
      try {
        const res = await apiCall(`admin/private/editblog/${id}`, "PUT", values);
        alert("Blog updated successfully");
        navigate.push("/admin/blog");
      } catch (error) {
        alert("Error posting blog");
      }
    },
  });

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type)) {
      alert("Invalid file type");
      return;
    }
    if (file.size > MAX_SIZE) {
      alert("File exceeds 10MB");
      return;
    }

    try {
      const uploadedFilename = await FileUpload(file);
      setBannerImg(uploadedFilename);
      formik.setFieldValue("bannerImg", uploadedFilename);
    } catch (err) {
      console.error("Upload failed", err);
      alert("Image upload failed. Please try again.");
    }
  };

  const handleRemove = () => {
    setBannerImg("");
    formik.setFieldValue("bannerImg", "");
  };

  const handleAddTag = () => {
    formik.setFieldValue("tags", [...formik.values.tags, { en: "", ar: "" }]);
  };

  const handleRemoveTag = (index) => {
    const updatedTags = formik.values.tags.filter((_, i) => i !== index);
    formik.setFieldValue("tags", updatedTags);
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="space-y-4 bg-gray-50 p-4 addblog"
    >
      <div className="flex items-center">
        <CircleArrowLeft
          size={40}
          onClick={() => navigate.back()}
          className="text-black"
        />
        <h2 className="text-3xl p-4 text-black">Edit Blog</h2>
      </div>

      {/* Title */}
      <div>
        <label>Title (EN)</label>
        <input
          name="title.en"
          value={formik.values.title.en}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full border p-2"
        />
        {formik.touched.title?.en && formik.errors.title?.en && (
          <div className="text-red-500 text-sm">{formik.errors.title.en}</div>
        )}

        <label>Title (AR)</label>
        <input
          name="title.ar"
          value={formik.values.title.ar}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full border p-2"
        />
        {formik.touched.title?.ar && formik.errors.title?.ar && (
          <div className="text-red-500 text-sm">{formik.errors.title.ar}</div>
        )}
      </div>

      {/* Slug */}
      <div>
        <label>Slug (EN)</label>
        <input
          name="slug.en"
          value={formik.values.slug.en}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full border p-2"
        />
        {formik.touched.slug?.en && formik.errors.slug?.en && (
          <div className="text-red-500 text-sm">{formik.errors.slug.en}</div>
        )}

        <label>Slug (AR)</label>
        <input
          name="slug.ar"
          value={formik.values.slug.ar}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full border p-2"
        />
        {formik.touched.slug?.ar && formik.errors.slug?.ar && (
          <div className="text-red-500 text-sm">{formik.errors.slug.ar}</div>
        )}
      </div>

      {/* Banner Image */}
      <div>
        <label>Banner Image</label>
        <input
          ref={fileInputRef}
          type="file"
          accept=".jpeg,.jpg,.png,.gif"
          className="w-full"
          onChange={handleFileChange}
        />
        {bannerImg && (
          <div className="mt-2">
            <img
              src={`https://forgetradingandconstruction.com/api/api/assets/get-asset?path=${encodeURIComponent(bannerImg)}`}
              alt="Banner Preview" className="h-40 w-auto" />
            <button type="button" onClick={handleRemove} className="text-red-500 underline">Remove</button>
          </div>
        )}
      </div>

      {/* Content */}
      <div>
        <label>Content (EN)</label>
        <JoditEditor
          value={formik.values.content.en}
          onChange={(value) => formik.setFieldValue("content.en", value)}
        />

        <label>Content (AR)</label>
        <JoditEditor
          value={formik.values.content.ar}
          onChange={(value) => formik.setFieldValue("content.ar", value)}
        />
      </div>

      {/* Tags */}
      <div>
        <label>Tags</label>
        {formik.values.tags.map((tag, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              name={`tags[${index}].en`}
              value={tag.en}
              onChange={formik.handleChange}
              placeholder="Tag EN"
              className="border p-2 w-1/2"
            />
            <input
              name={`tags[${index}].ar`}
              value={tag.ar}
              onChange={formik.handleChange}
              placeholder="Tag AR"
              className="border p-2 w-1/2"
            />
            <button
              type="button"
              onClick={() => handleRemoveTag(index)}
              className="text-red-500"
            >
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddTag} className="text-blue-500">Add Tag</button>
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Update Blog
      </button>
    </form>
  );
}