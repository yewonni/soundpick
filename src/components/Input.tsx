import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  width?: "sm" | "md" | "full";
}

export default function Input({ width = "md", ...props }: InputProps) {
  const getWidthClass = () => {
    switch (width) {
      case "sm":
        return "w-40 md:w-80";
      case "md":
        return "w-80";
      case "full":
        return "w-full";
      default:
        return "w-80";
    }
  };

  return (
    <input
      className={`border border-[#d9d9d9] rounded-md px-3 py-2 
              focus:outline-none focus:ring-1 focus:ring-purple-400 focus:border-purple-400 ${getWidthClass()}`}
      {...props}
    />
  );
}
