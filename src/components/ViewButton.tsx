import React, { ButtonHTMLAttributes } from "react";

interface ViewButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const ViewButton: React.FC<ViewButtonProps> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <button
      className={`text-gray-300 ${className} cursor-pointer text-sm hover:underline`}
      {...props}
    >
      {children}
    </button>
  );
};

export default ViewButton;
