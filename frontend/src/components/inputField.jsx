import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
const InputField = ({ label, type = "text", register, name, error }) => {
  const [focused, setFocused] = useState(false);
 const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  return (
    <div className="relative w-full">
      <input
         type={isPassword && showPassword ? "text" : type}
        {...register(name, { required: `${label} is required` })}
        onFocus={() => setFocused(true)}
        onBlur={(e) => setFocused(e.target.value !== "")}
        className="peer w-full px-4 pt-5 pb-2 bg-card border border-border 
        rounded-xl shadow-sm text-text placeholder-muted
        focus:outline-none focus:ring-2 focus:ring-primary transition"
      />

      <label
        className={`absolute left-3 px-1 bg-card transition-all duration-200
        ${focused ? "top-1 text-xs text-primary" : "top-3 text-muted"}
        peer-focus:top-1 peer-focus:text-xs peer-focus:text-primary`}
      >
        {label}
      </label>
          {isPassword && (
        <span
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-3 cursor-pointer text-muted hover:text-primary"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      )}
      {error && (
        <p className="text-red-500 text-xs mt-1">{error.message}</p>
      )}
    </div>
  );
};

export default InputField;