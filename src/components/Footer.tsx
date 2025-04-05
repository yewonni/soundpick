export default function Footer() {
  return (
    <footer className="bg-stone-800 text-white w-full px-4 py-8 mt-20 md:px-[10%]">
      <div className="flex justify-between flex-col md:flex-row gap-4 md:gap-0">
        <div className="flex items-center gap-3 font-semibold text-sm">
          <p className="hover:underline cursor-pointer">이용약관</p>
          <span className="hidden md:inline">|</span>
          <p className="hover:underline cursor-pointer">개인정보처리방침</p>
        </div>
        <div className="text-xs text-stone-300">
          ⓒ 2025 Soundpick Inc. All rights reserved.
        </div>
      </div>

      <dl className="flex flex-col gap-1 text-xs text-stone-300 mt-4 leading-relaxed">
        <div className="flex">
          <dt className="sr-only">기업이름</dt>
          <dd className="font-bold text-white">주식회사 Soundpick</dd>
        </div>
        <div className="flex gap-1">
          <dt>대표이사 :</dt>
          <dd>김예원, 김진수</dd>
        </div>
        <div className="flex gap-1">
          <dt>사업자등록번호 :</dt>
          <dd>123-45-67890</dd>
        </div>
        <div className="flex gap-1">
          <dt>주소 :</dt>
          <dd>서울특별시 강남구 테헤란로 123, Soundpick</dd>
        </div>
      </dl>
    </footer>
  );
}
