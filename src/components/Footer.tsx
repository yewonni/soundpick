export default function Footer() {
  return (
    <footer className="bg-[#8F9BB6] w-full text-white text-sm px-4 py-7 mt-[50px] md:px-[10%] ">
      <div className="flex justify-start font-semibold">
        <div className="flex items-center gap-2">
          <p className="hover:underline cursor-pointer">이용약관</p>
          <p>|</p>
          <p className="hover:underline cursor-pointer">개인정보처리방침</p>
        </div>
      </div>
      <dl className="flex flex-col gap-1 mt-3">
        <div className="flex">
          <dt className="sr-only">기업이름</dt>
          <dd className="font-bold">주) soundpick</dd>
        </div>
        <div className="flex gap-1">
          <dt>대표이사 : </dt>
          <dd>김예원, 김진수</dd>
        </div>
        <div className="flex gap-1">
          <dt>사업자등록번호 : </dt>
          <dd>123 - 45 - 67890</dd>
        </div>
        <div className="flex gap-1">
          <dt>주소 : </dt>
          <dd>서울특별시 강남구 테헤란로 123, soundpick</dd>
        </div>
      </dl>
    </footer>
  );
}
