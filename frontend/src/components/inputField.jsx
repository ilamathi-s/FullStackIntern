import { useState } from "react";

const InputField = ({ label, type = "text", register, name, error }) => {
  const [focused, setFocused] = useState(false);

  return (
    <div className="relative w-full">
      <input
        type={type}
        {...register(name)}
        onFocus={() => setFocused(true)}
        onBlur={(e) => setFocused(e.target.value !== "")}
        className="peer w-full px-4 pt-5 pb-2 bg-white border border-gray-300 
        rounded-xl shadow-sm text-gray-900 placeholder-gray-400
        focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
      />

      <label
        className={`absolute left-3 px-1 bg-white transition-all duration-200
        ${focused ? "top-1 text-xs text-blue-500" : "top-3 text-gray-400"}
        peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-500`}
      >
        {label}
      </label>

      {error && (
        <p className="text-red-500 text-xs mt-1">{error.message}</p>
      )}
    </div>
  );
};

export default InputField;