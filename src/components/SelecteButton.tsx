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
      className={`w-full flex justify-center border border-primary p-2 md:p-3 text-md font-bold rounded-[12px] transition-colors duration-200 ${
        selected
          ? "bg-white/60 text-purple-800"
          : "bg-transparent text-text-base hover:bg-white/20"
      }`}
    >
      {children}
    </button>
  );
}
