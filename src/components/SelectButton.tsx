interface SelectButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  selected?: boolean;
}

export default function SelectButton({
  children,
  onClick,
  selected = false,
}: SelectButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex justify-center border border-primary p-2 md:p-3 text-md font-bold rounded-[12px] transition-colors duration-200 ${
        selected
          ? "bg-white/40 text-primary"
          : "bg-transparent text-text-base hover:bg-white/20"
      }`}
    >
      {children}
    </button>
  );
}
