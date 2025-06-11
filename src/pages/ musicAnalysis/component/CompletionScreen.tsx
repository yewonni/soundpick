import { useNavigate } from "react-router-dom";
export default function CompletionScreen() {
  const navigate = useNavigate();
  return (
    <div
      className="flex flex-col items-center justify-center h-screen p-4 gap-4"
      style={{
        backgroundImage:
          "linear-gradient(360deg, #d1c3fc 0%, #a5b4fc 50%, #dbeafe 100%)",
      }}
    >
      <h1 className="font-medium text-text-base md:text-lg text-base flex items-center gap-1">
        <span className="text-text-subtle font-bold text-xl md:text-2xl">
          "음악 취향 분석"{" "}
        </span>
        <span>이 완성됐어요!</span>
      </h1>
      <p className="mt-2 md:text-lg text-text-base">
        이제 나만의 사운드 트랙을 즐겨볼까요?
      </p>
      <button
        className="border border-text-base rounded-[20px] text-text-base font-semibold p-2 px-8 hover:font-bold hover:bg-purple-500 active:bg-purple-600"
        onClick={() => navigate("/")}
      >
        홈으로 가기
      </button>
    </div>
  );
}
