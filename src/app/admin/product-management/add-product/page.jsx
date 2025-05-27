"use client";
import React, { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import InputField from "../../../hook/input";
import FileUpload from "../../../utils/upload"; // your provided upload function
import SelectComponent from "../../../hook/select";
import Select from "react-select";
import { apiCall } from "../../../utils/ApiCall";
import { useRouter } from "next/navigation";
import { CircleArrowLeft } from "lucide-react";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });
const MAX_SIZE = 3145728;
const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/gif"];

const categoryOptions = [
  { label: "Wooden MDF Decor", value: "Wooden MDF Decor" },
  { label: "Tulsi Malas", value: "Tulsi Malas" },
  { label: "Spiritual Powders", value: "Spiritual Powders" },
  { label: "Poshak & Clothing", value: "Poshak & Clothing" },
  { label: "Bead Bags", value: "Bead Bags" },
  { label: "Perfumes And Fragrances", value: "Perfumes And Fragrances" },
  { label: "Soft Toys", value: "Soft Toys" },
  { label: "Spiritual Books", value: "Spiritual Books" },
  { label: "Brass Idols", value: "Brass Idols" },
  { label: "Pooja Accessories", value: "Pooja Accessories" },
  { label: "Bracelet", value: "Bracelet" },
  { label: "Electronic Accessories", value: "Electronic Accessories" },
  { label: "Shringar Accessories", value: "Shringar Accessories" },
  { label: "Laddu Gopal Singhasan", value: "Laddu Gopal Singhasan" },
  { label: "Tulsi Earrings", value: "Tulsi Earrings" },
  { label: "Marble Dust Statue", value: "Marble Dust Statue" },
];

const colorOptions = [
  { label: "Red", value: "Red" },
  { label: "Blue", value: "Blue" },
  { label: "Green", value: "Green" },
  { label: "Yellow", value: "Yellow" },
  { label: "Black", value: "Black" },
  { label: "White", value: "White" },
  { label: "Orange", value: "Orange" },
  { label: "Purple", value: "Purple" },
  { label: "Pink", value: "Pink" },
  { label: "Brown", value: "Brown" },
];

const sizeoption = [
  { label: "0", value: 0 },
  { label: "1", value: 1 },
  { label: "2", value: 2 },
  { label: "3", value: 3 },
];

const validationSchema = Yup.object({
  productName: Yup.string().required("Required"),
  category: Yup.array().min(1, "Select at least one category"),
  productColor: Yup.array().min(1, "Select at least one color"),
  originalPrice: Yup.number().required("Required"),
  finalPrice: Yup.number().required("Required"),
  offerPercentage: Yup.number(),
  size: Yup.number(),
  ratings: Yup.number(),
  stock: Yup.number().required("Required"),
  description: Yup.string().required("Required"),
  images: Yup.array().min(1, "Please upload at least one image"),
});

function Product() {
  let navigate = useRouter();
  const [categoryType, setCategoryType] = useState("");
  console.log(categoryType);
  const fileInputRef = useRef(null);
  const [error, setError] = useState("");
  const handleFileChange = async (e, setFieldValue) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter((file) => {
      if (!ALLOWED_TYPES.includes(file.type)) {
        setError("Some files have invalid types.");
        return false;
      }
      if (file.size > MAX_SIZE) {
        setError("Some files exceed 3MB.");
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    try {
      const uploadPromises = validFiles.map((file) => FileUpload(file));
      const uploadedFilenames = await Promise.all(uploadPromises);
      console.log(uploadedFilenames);
      setFieldValue("images", uploadedFilenames); // ✅ correct way
      setError("");
    } catch (err) {
      console.error("Upload failed", err);
      setError("Image upload failed. Please try again.");
    }
  };

  const handleCreate = async (values) => {
    try {
      const formData = {
        ...values,
        category: values.category?.value,
        subCategory: values.subCategory?.value,
        productColor: values.productColor?.map((item) => item.value) || [],
        size: values.size?.map((item) => item.value) || [],
      };
      const response = await apiCall(
        "/admin/private/create-product",
        "post",
        formData
      );
      if (response.success) {
        navigate.push("/admin/product-management");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleRemove = (indexToRemove, setFieldValue, values) => {
    console.log(indexToRemove);
    const updatedImages = values.images.filter((_, i) => i !== indexToRemove);
    setFieldValue("images", updatedImages);
  };
  const [category, setCategory] = useState();
  const [catData, setCatData] = useState();
  const getcategory = async () => {
    try {
      const { data } = await apiCall(
        "/admin/private/getAllCategory?limit=100",
        "get"
      );
      let res = data?.docs;
      setCatData(res);
      setCategory(
        res.map((item) => ({
          label: item?.category,
          value: item?.category,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getcategory();
  }, []);

  console.log(category);

  return (
    <Formik
      initialValues={{
        productName: "",
        category: [],
        productColor: [],
        originalPrice: "",
        offerPercentage: "",
        finalPrice: "",
        subCategory: "",
        size: [],
        stock: "",
        description: "",
        images: [],
      }}
      // validationSchema={validationSchema}
      onSubmit={(values) => {
        const original = parseFloat(values.originalPrice) || 0;
        const offer = parseFloat(values.offerPercentage) || 0;
        const final = original - (original * offer) / 100;
        values.finalPrice = final.toFixed(2); // Set the final price here
        handleCreate(values); // Submit with updated values
      }}
    >
      {({ values, setFieldValue }) => {
        return (
          <Form className="px-6 bg-gray-100 py-10 shadow-2xl mt-0 flex flex-wrap space-y-4">
            <div className="flex items-center">
              <CircleArrowLeft
                size={40}
                onClick={() => navigate.back()}
                className="text-black"
              />
              <h2 className="text-3xl ms-3 text-black font-bold">
                Add Product
              </h2>
              <hr className="bg-purple-600 h-1 mb-8" />
            </div>

            {/* Product Name */}
            <div className="w-full">
              <label className="text-black">Product Name</label>
              <Field
                name="productName"
                as={InputField}
                placeholder="Enter product name"
                required
                className="w-full p-2 rounded bg-white/50 placeholder-gray-600 border-1 border-gray-300 text-gray-900 outline-none focus:ring-2 focus:ring-purple-400"
              />
              <ErrorMessage
                name="productName"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Product Images */}
            <div className="w-full  mx-auto bg-white shadow-md rounded-2xl p-6">
              <label className="block text-gray-700 font-semibold mb-2">
                Product Images
              </label>

              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-purple-400 rounded-xl w-full h-44 flex items-center justify-center bg-purple-50 cursor-pointer hover:bg-purple-100 transition-colors"
              >
                <div className="text-center text-purple-700">
                  <div className="text-4xl">📤</div>
                  <p className="mt-2 text-sm">
                    Click or drag files here to upload
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    JPEG, PNG, GIF up to 3MB
                  </p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, setFieldValue)}
                  className="hidden"
                />
              </div>

              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

              <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 gap-4">
                {values.images.map((src, idx) => (
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
                      onClick={() => handleRemove(idx, setFieldValue, values)}
                      className="absolute top-0 right-0 bg-red-600 bg-opacity-80 text-white text-xs px-2 py-1 rounded-bl-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    >
                      ✖
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Category */}
            <div className="w-full">
              <label className="text-black">Category</label>
              <Select
                className=""
                required
                options={category}
                value={values.category}
                onChange={(selected) => {
                  setFieldValue("category", selected);
                  setCategoryType(selected?.value);
                }}
              />
            </div>

            {/* Size */}
            <div className="w-full">
              <label className="text-black">Sub Category</label>
              <Select
                options={
                  catData
                    ?.find((item) => item?.category === values?.category?.value)
                    ?.subCategory?.filter((sub) => sub)
                    ?.map((sub) => ({
                      label: sub,
                      value: sub,
                    })) || []
                }
                value={values.subCategory}
                onChange={(selected) => setFieldValue("subCategory", selected)}
              />
            </div>

            {/* Original Price */}
            <div className="sm:flex-1/3 pe-3">
              <label className="text-black">Original Price</label>
              <Field
                name="originalPrice"
                type="number"
                required
                as={InputField}
                className="w-full p-2 rounded bg-white/50 placeholder-gray-600 border-1 border-gray-300 text-gray-900 outline-none focus:ring-2 focus:ring-purple-400"
              />
              <ErrorMessage
                name="originalPrice"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Offer Percentage */}
            <div className="sm:flex-1/3  px-3">
              <label className="text-black">Offer Percentage</label>
              <Field
                name="offerPercentage"
                type="number"
                as={InputField}
                required
                min={1}
                max={100}
                className="w-full p-2 rounded bg-white/50 placeholder-gray-600 border-1 border-gray-300 text-gray-900 outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            {/* Final Price */}
            <div className="sm:flex-1/3 pe-3">
              <label className="text-black">Final Price</label>
              <Field
                name="finalPrice"
                type="number"
                as={InputField}
                disabled
                className="w-full p-2 rounded bg-white/50 placeholder-gray-600 border-1 border-gray-300 text-gray-900 outline-none focus:ring-2 focus:ring-purple-400"
              />
              <ErrorMessage
                name="finalPrice"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Stock */}
            <div className="flex-1/3 pe-3">
              <label className="text-black">Stock</label>
              <Field
                name="stock"
                type="number"
                as={InputField}
                required
                className="w-full p-2 rounded bg-white/50 placeholder-gray-600 border-1 border-gray-300 text-gray-900 outline-none focus:ring-2 focus:ring-purple-400"
              />
              <ErrorMessage
                name="stock"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

             <div className="flex-1/3 pe-3">
              <label className="text-black">Shipping Charge</label>
              <Field
                name="shippingCharge"
                type="number"
                as={InputField}
                required
                className="w-full p-2 rounded bg-white/50 placeholder-gray-600 border-1 border-gray-300 text-gray-900 outline-none focus:ring-2 focus:ring-purple-400"
              />
              <ErrorMessage
                name="shippingCharge"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Description */}
            <div className="w-full">
              <label className="text-black">Description</label>
              <JoditEditor
                value={values.description}
                size="800"
                onBlur={(value) => setFieldValue("description", value)}
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Submit Product
            </button>
          </Form>
        );
      }}
    </Formik>
  );
}

export default Product;
