import { useState, useEffect, useRef } from "react";

interface DomainSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export default function DomainSelect({ value, onChange }: DomainSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const domains = ["gmail.com", "naver.com", "daum.net"];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (domain: string) => {
    onChange(domain);
    setIsOpen(false);
  };

  return (
    <div ref={selectRef} className="relative w-full">
      <div
        className="flex items-center justify-between p-3  text-sm font-medium text-text-base border border-text-base rounded-lg cursor-pointer bg-transparent"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{value || "도메인 선택"}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          className={`text-text-base transform ${isOpen ? "rotate-180" : ""}`}
        >
          <path
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 7l5 5 5-5"
          />
        </svg>
      </div>

      {isOpen && (
        <div
          className="absolute z-10 w-full mt-1 bg-primary border border-text-base rounded-lg shadow-lg"
          style={{ top: "100%" }}
        >
          {domains.map((domain) => (
            <div
              key={domain}
              className="cursor-pointer p-3 text-sm text-text-base hover:bg-accent hover:rounded-lg"
              onClick={() => handleSelect(domain)}
            >
              {domain}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
