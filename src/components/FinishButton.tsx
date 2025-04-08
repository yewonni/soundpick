import React, { ButtonHTMLAttributes } from "react";

interface FinishButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const FinishButton: React.FC<FinishButtonProps> = ({
  className = "",
  ...props
}) => {
  return (
    <button
      className={` font-bold text-lg md:text-[22px] ${className}`}
      {...props}
    >
      완료
    </button>
  );
};

export default FinishButton;
