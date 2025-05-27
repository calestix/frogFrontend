"use client";
import { useState } from "react";

const InputField = ({
  label,
  type = "text",
  placeholder,
  textarea = false,
  ...props
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handlePasswordToggle = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const inputType = type === "password" && isPasswordVisible ? "text" : type;

  return (
    <div className="mb-4">
      <label
        htmlFor={label}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <div className="relative mt-1">
        {textarea ? (
          <textarea
            id={label}
            autoComplete="false"
            placeholder={placeholder}
            className="w-full p-3 rounded-lg bg-white/50 placeholder-gray-600 text-gray-900 outline-none focus:ring-2 focus:ring-purple-400 h-32"
            {...props}
          />
        ) : (
          <>
            <input
              id={label}
              type={inputType}
              autoComplete="false"
              placeholder={placeholder}
              className="w-full p-3 rounded-lg bg-white/50 placeholder-gray-600 text-gray-900 outline-none focus:ring-2 focus:ring-purple-400"
              {...props}
            />
            {type === "password" && (
              <button
                type="button"
                onClick={handlePasswordToggle}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
              >
                {isPasswordVisible ? "🙈" : "👁️"}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default InputField;
