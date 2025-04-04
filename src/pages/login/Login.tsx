import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../images/logo.svg";
import Checkbox from "../../components/Checkbox";
import Button from "../../components/Button";
export default function Login() {
  const navigate = useNavigate();
  const [isCircleChecked, setIsCircleChecked] = useState(false);

  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <h1>
        <img
          src={logo}
          alt="로고"
          className="w-[230px] cursor-pointer md:w-[300px] "
          onClick={() => navigate("/")}
        />
      </h1>
      <article className="mt-4">
        <h2 className="sr-only">로그인</h2>
        <form
          action=""
          className="w-[295px] min-h-[210px] max-h-[350px] md:w-[450px] md:min-h-[300px] rounded-lg bg-white bg-opacity-60 p-[25px] md:p-[40px] flex flex-col gap-3 md:gap-4"
        >
          <div className="flex flex-col gap-3 items-start text-sm mt-2 md:text-base md:mt-4">
            <label htmlFor="userId" className="sr-only ">
              아이디
            </label>
            <input
              type="text"
              id="userId"
              name="userId"
              placeholder="아이디를 입력해 주세요."
              className="border-b border-b-purple-500 w-full py-2 focus:outline-none bg-transparent focus:bg-transparent"
            />
            <label htmlFor="pw" className="sr-only">
              비밀번호
            </label>
            <input
              type="password"
              id="pw"
              name="password"
              placeholder="비밀번호를 입력해 주세요."
              className="border-b border-b-purple-500 w-full py-2 focus:outline-none bg-transparent focus:bg-transparent"
            />
            {/* <p className="text-xs text-primary md:text-sm">
              아이디 또는 비밀번호가 일치하지 않습니다.
            </p> */}
          </div>
          <div className="flex gap-1 justify-end items-center mb-1">
            <Checkbox
              type="circle"
              checked={isCircleChecked}
              onChange={setIsCircleChecked}
            />
            <p className="text-xs text-primary ">아이디 저장</p>
          </div>
          <Button size="full">로그인</Button>
        </form>
        <div className="flex gap-2 items-center justify-center mt-3 md:mt-4 text-xs md:text-sm text-[#333]">
          <p
            className="cursor-pointer  hover:text-primary active:font-semibold"
            onClick={() => navigate("/join")}
          >
            회원가입
          </p>
          <span className="w-px h-3 bg-[#333]"></span>
          <p>비밀번호 찾기</p>
        </div>
      </article>
    </main>
  );
}
