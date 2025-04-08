import React from "react";
// import backImg from "../images/back-img.png";

interface Props {
  children: React.ReactNode;
}

export default function BackgroundWrapper({ children }: Props) {
  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      <div
        style={{
          backgroundImage:
            "linear-gradient(360deg, #6f60a5 0%, #5a5ca2 35%, #4a5a9e 60%, #3f4a7c 85%, #2e3455 100%)",
        }}
      ></div>

      {/* <div
        className="absolute inset-0 z-10 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: `url(${backImg})`,
        }}
      ></div> */}

      <div className="relative z-20">{children}</div>
    </div>
  );
}
