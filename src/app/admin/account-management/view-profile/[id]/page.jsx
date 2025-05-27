"use client";

import { CircleArrowLeft } from "lucide-react";
import { apiCall } from "../../../../utils/ApiCall";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function ViewUserProfile() {
  const navigate = useRouter();
  const { id } = useParams();
  const [userData, setUserData] = useState();

  const response = async () => {
    try {
      const data = await apiCall(`/admin/private/getUserById/${id}`, "get");
      setUserData(data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    response();
  }, []);

  return (
    <div className="max-w-5xl bg-gray-100 px-6 py-6">
      <div className="flex items-center">
        <CircleArrowLeft
          size={40}
          onClick={() => navigate.back()}
          className="text-black"
        />
        <h2 className="text-3xl ms-3 text-black font-bold">
          User Details
        </h2>
        <hr className="bg-purple-600 h-1 mb-8" />
      </div>

      <div className="bg-gradient-to-br mt-4 from-white to-purple-50 rounded-3xl shadow-2xl p-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="relative">
            <img
              src={
                userData?.profileImage
                  ? `https://brajkunjseva.com/api/assets/get-asset?path=${encodeURIComponent(
                      userData?.profileImage
                    )}`
                  : `https://ui-avatars.com/api/?name=${
                      userData?.firstName?.[0] ?? ""
                    }${
                      userData?.lastName?.[0] ?? ""
                    }&background=random&color=fff&size=128`
              }
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = `https://ui-avatars.com/api/?name=${
                  userData?.firstName?.[0] ?? ""
                }${
                  userData?.lastName?.[0] ?? ""
                }&background=random&color=fff&size=128`;
              }}
              alt="Profile"
              className="w-36 h-36 rounded-full border-4 border-purple-600 object-cover shadow-md"
            />
          </div>

          <div className="flex-1">
            <h2 className="text-3xl font-bold capitalize text-purple-800">
              {userData?.firstName} {userData?.lastName}
            </h2>
            <p className="text-gray-700 text-md">{userData?.email}</p>
            <p className="mt-2 text-sm text-green-600 font-medium">
              {userData?.isVerified ? "Verified User" : "Not Verified"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-1">
              👤 Personal Info
            </h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>
                <strong>Gender:</strong> {userData?.gender}
              </li>
              <li>
                <strong>Phone:</strong> +{userData?.countryCode}{" "}
                {userData?.phoneNumber}
              </li>
              <li>
                <strong>About:</strong> {userData?.about}
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-1">
              🏠 Address Info
            </h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>
                <strong>Address:</strong> {userData?.address}
              </li>
              <li>
                <strong>City:</strong> {userData?.city}
              </li>
              <li>
                <strong>State:</strong> {userData?.state}
              </li>
              <li>
                <strong>Country:</strong> {userData?.country}
              </li>
              <li>
                <strong>Zip:</strong> {userData?.zip}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 text-xs text-gray-500 border-t pt-4">
          <p>
            <strong>Account Created:</strong>{" "}
            {new Date(userData?.createdAt).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
