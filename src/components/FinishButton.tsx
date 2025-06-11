import { ButtonHTMLAttributes } from "react";

interface FinishButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const FinishButton: React.FC<FinishButtonProps> = ({
  className = "",
  ...props
}) => {
  return (
    <button
      className={` font-bold text-lg md:text-[22px] text-purple-100 ${className}`}
      {...props}
    >
      완료
    </button>
  );
};

export default FinishButton;
