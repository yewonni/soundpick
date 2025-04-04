import { useState } from "react";

interface SelectButtonProps {
  children: React.ReactNode;
}

export default function SelectButton({ children }: SelectButtonProps) {
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    setSelected(!selected);
  };

  return (
    <button
      onClick={handleClick}
      className={`w-full flex justify-center border border-purple-600 p-2 md:p-3 text-md text-black font-bold rounded-[12px] ${
        selected ? "bg-[#EAE3FE] " : "hover:bg-gray-100"
      }`}
    >
      {children}
    </button>
  );
}
