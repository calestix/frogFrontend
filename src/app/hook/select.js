const SelectComponent = ({ label, options, ...props }) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={label}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <select
        id={label}
        className="w-full p-3 rounded-lg bg-white/50 placeholder-gray-600 text-gray-900 outline-none focus:ring-2 focus:ring-purple-400"
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectComponent;
