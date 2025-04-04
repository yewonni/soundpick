import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  primary?: boolean;
  default?: boolean;
  outline?: boolean;
  disabled?: boolean;
  size?: "sm" | "md" | "lg" | "full";
}

const buttonVariants = {
  primary: "bg-purple-400 hover:bg-purple-500 active:bg-purple-600 text-white",
  default:
    "border border-purple-200 bg-white text-purple-200 hover:bg-gray-100 active:bg-gray-300",
  outline:
    "border border-purple-600 border-2 bg-white text-purple-600 hover:bg-gray-100 active:bg-gray-300",
  disabled: "bg-purple-100 text-purple-200 cursor-not-allowed",
} as const;

const buttonSizes = {
  sm: "px-2 py-1 text-xs w-15",
  md: "px-2 py-2 text-sm w-20 md:w-[90px]",
  lg: "px-5 py-2 text-lg w-96",
  full: "px-4 py-3 text-md w-full",
} as const;

export default function Button({
  children,
  primary,
  default: isDefault,
  outline,
  disabled,
  size = "md",
  ...props
}: ButtonProps) {
  const baseStyles = "rounded-lg font-bold transition-all";
  const resolvedVariant = disabled
    ? "disabled"
    : primary
    ? "primary"
    : outline
    ? "outline"
    : isDefault
    ? "default"
    : "primary";
  const variantStyles = buttonVariants[resolvedVariant];
  const sizeStyles = buttonSizes[size];

  return (
    <button
      className={`${baseStyles} ${variantStyles} ${sizeStyles}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
