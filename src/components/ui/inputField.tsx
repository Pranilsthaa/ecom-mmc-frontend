import { Eye, EyeOff, LucideIcon, Mail } from "lucide-react";
import React, { InputHTMLAttributes, useState } from "react";

type inputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  labelFor: string;
  Icon?: LucideIcon;
  isPassword?: boolean;
};

const InputField = ({
  isPassword = false,
  label,
  labelFor,
  Icon,
  type,
  ...rest
}: inputFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;
  return (
    <>
      {label && (
        <label
          htmlFor={labelFor}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <div className="relative flex items-center w-full pl-4  border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-colors duration-200 bg-white/50 backdrop-blur-sm">
        {Icon && <Icon className=" text-gray-400" size={20} />}
        <input
          {...rest}
          type={inputType}
          className="pl-4 h-full py-4 w-full outline-none"
        />
        {isPassword && (
          <button type="button" onClick={() => setShowPassword((p) => !p)}>
            {showPassword ? (
              <EyeOff className=" text-gray-400 mr-3 " size={20} />
            ) : (
              <Eye className=" text-gray-400 mr-3 " size={20} />
            )}
          </button>
        )}
      </div>
    </>
  );
};

export default InputField;
