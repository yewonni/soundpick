interface Props {
  children: React.ReactNode;
}

export default function BackgroundWrapper({ children }: Props) {
  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "linear-gradient(180deg, #f9e1d6 0%, #bcb1e6 100%)",
        }}
      ></div>

      <div className="relative z-10">{children}</div>
    </div>
  );
}
