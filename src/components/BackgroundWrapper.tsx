import React from "react";
import backImg from "../images/back-img.png";

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
            "linear-gradient(140deg, #d2e9ff 0%, #a2bbff 10%, #7b9dff 30%, #6f78f6 60%, #443d9e 100%)",
        }}
      ></div>

      <div
        className="absolute inset-0 z-10 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: `url(${backImg})`,
        }}
      ></div>

      <div className="relative z-20">{children}</div>
    </div>
  );
}
