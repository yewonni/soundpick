export default function NoSearchResult() {
  return (
    <div className="flex flex-col justify-center items-center gap-2 mt-28">
      <p className="text-base md:text-lg font-bold text-center text-bg-peach ">
        검색 결과가 없습니다.
      </p>
      <p className="text-bg-secondary text-sm md:text-base">
        다른 키워드로 다시 검색해 보세요.
      </p>
    </div>
  );
}
