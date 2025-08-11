import { Eye, EyeOff, LucideIcon, Mail } from "lucide-react";
import React, { InputHTMLAttributes, useState } from "react";

type inputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  labelFor?: string;
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
      <div className="relative bg-[var(--color-input-bg)]/50 flex items-center w-full pl-4 border border-[var(--color-border)] rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-colors duration-200  backdrop-blur-sm">
        {Icon && <Icon className="mr-2 text-[var(--color-icon)]" size={20} />}
        <input
          type={inputType}
          className=" h-full py-4 w-full  outline-none placeholder-[var(--color-foreground)]/40"
          {...rest}
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
