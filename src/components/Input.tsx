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
      className={`border-b border-text-base bg-transparent placeholder-gray-200
     py-1 text-sm text-text-base focus:outline-none focus:ring-0 ${getWidthClass()}`}
      {...props}
    />
  );
}
