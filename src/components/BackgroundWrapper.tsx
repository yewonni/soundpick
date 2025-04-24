import React from "react";

interface Props {
  children: React.ReactNode;
}

export default function BackgroundWrapper({ children }: Props) {
  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            "linear-gradient(360deg, #d1c3fc 0%, #a5b4fc 50%, #dbeafe 100%)",
        }}
      ></div>

      <div className="relative z-10">{children}</div>
    </div>
  );
}
