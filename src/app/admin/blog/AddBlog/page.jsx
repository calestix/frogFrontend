"use client";
import React, { useState, useRef } from "react";
import { useFormik } from "formik";
import { AddblogvalidationSchema } from "../../../utils/validation";
import dynamic from "next/dynamic";
import { apiCall } from "../../../utils/ApiCall";
import FileUpload from "../../../utils/upload";
import { useRouter } from "next/navigation";
import { CircleArrowLeft } from "lucide-react";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
const MAX_SIZE = 10 * 1024 * 1024; // 10MB

export default function AddBlogForm() {
  const navigate = useRouter();
  const [bannerImg, setBannerImg] = useState("");
  const fileInputRef = useRef(null);

  const formik = useFormik({
    initialValues: {
      title: { en: "", ar: "" },
      slug: { en: "", ar: "" },
      authorId: "",
      bannerImg: "",
      content: { en: "", ar: "" },
      tags: [{ en: "", ar: "" }],
    },
    validationSchema: AddblogvalidationSchema,
    onSubmit: async (values) => {
      try {
        const res = await apiCall("admin/private/addblog", "POST", values);
        alert("Blog posted successfully");
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
        <h2 className=" text-3xl p-4 text-black">Add Blog</h2>
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
          className="hidden"
          onChange={handleFileChange}
        />
        <div
          onClick={() => fileInputRef.current.click()}
          className="border-dashed text-black border-2 border-gray-300 rounded p-4 cursor-pointer"
        >
          Click to upload banner image
        </div>
        {formik.touched.bannerImg && formik.errors.bannerImg && (
          <div className="text-red-500 text-sm">{formik.errors.bannerImg}</div>
        )}

        {bannerImg && (
          <div className="mt-2 relative w-32 h-32">
            <img
              src={bannerImg}
              alt="banner"
              className="w-full h-full object-cover rounded"
            />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1"
            >
              X
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      <div>
        <label>Content (EN)</label>
        <JoditEditor
          value={formik.values.content.en}
          onChange={(newContent) =>
            formik.setFieldValue("content.en", newContent)
          }
        />
        {formik.touched.content?.en && formik.errors.content?.en && (
          <div className="text-red-500 text-sm">{formik.errors.content.en}</div>
        )}

        <label>Content (AR)</label>
        <JoditEditor
          value={formik.values.content.ar}
          onChange={(newContent) =>
            formik.setFieldValue("content.ar", newContent)
          }
        />
        {formik.touched.content?.ar && formik.errors.content?.ar && (
          <div className="text-red-500 text-sm">{formik.errors.content.ar}</div>
        )}
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
              onBlur={formik.handleBlur}
              placeholder="Tag EN"
              className="border p-2 w-full"
            />
            <input
              name={`tags[${index}].ar`}
              value={tag.ar}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Tag AR"
              className="border p-2 w-full"
            />
            <button
              type="button"
              onClick={() => handleRemoveTag(index)}
              className="bg-red-500 text-white px-2"
            >
              X
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddTag}
          className="bg-blue-500 text-white px-4 py-2 mt-2"
        >
          + Add Tag
        </button>
      </div>

      <button
        type="submit"
        className="bg-green-600 text-white px-6 py-2 rounded"
      >
        Submit
      </button>
    </form>
  );
}
