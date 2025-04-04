import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../images/logo.svg";
import Input from "../../components/Input";
import Checkbox from "../../components/Checkbox";
import Button from "../../components/Button";
export default function Join() {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);

  return (
    <main className="flex flex-col items-center justify-center h-screen mb-11">
      <h1>
        <img
          src={logo}
          alt="로고"
          className="w-[230px] cursor-pointer md:w-[300px]"
          onClick={() => navigate("/")}
        />
      </h1>
      <article className="mt-4">
        <h2 className="sr-only">회원가입</h2>
        <form
          action=""
          className=" w-[295px] md:w-[420px] rounded-lg bg-white bg-opacity-60 p-[25px] md:p-[30px] flex flex-col gap-1 md:gap-2 text-sm"
        >
          <label htmlFor="nickName" className="text-primary font-bold ">
            닉네임
          </label>
          <div className="flex gap-3 ">
            <Input
              id="nickName"
              name="nickName"
              width="sm"
              placeholder="닉네임"
            />
            <Button>중복확인</Button>
          </div>
          <label htmlFor="userId" className="text-primary font-bold mt-2">
            아이디
          </label>
          <div className="flex gap-3">
            <Input id="userId" name="userId" width="sm" placeholder="아이디" />
            <Button>중복확인</Button>
          </div>
          <p className="text-xs text-secondary pl-1">
            4~12자 / 영문 소문자 (숫자 조합 가능)
          </p>
          <label htmlFor="pw" className="text-primary font-bold mt-2">
            비밀번호
          </label>
          <Input id="pw" name="password" width="full" placeholder="비밀번호" />
          <Input
            id="pw"
            name="password"
            width="full"
            placeholder="비밀번호 확인"
          />
          <p className="text-xs text-secondary pl-1">
            6~20자 / 영문 대소문자, 숫자, 특수문자 중 2가지 이상 조합
          </p>
          <label htmlFor="email" className="text-primary font-bold mt-2">
            이메일
          </label>
          <div className="flex gap-3 items-center">
            <Input id="email" name="email" width="full" placeholder="이메일" />
            <p>@</p>
            <Input id="email" name="email" width="full" placeholder="이메일" />
          </div>
          <label htmlFor="mobile" className="text-primary font-bold mt-2">
            휴대폰번호
          </label>
          <Input
            id="mobile"
            name="mobile"
            width="full"
            placeholder="휴대폰번호"
          />
        </form>
        <div className="flex gap-1 text-sm text-[#333] mt-4 mb-4 pl-1">
          <Checkbox type="circle" checked={isChecked} onChange={setIsChecked} />
          <p className="text-xs">이용약관 및 개인정보처리방침 동의</p>
        </div>
        <div className="px-3 ">
          <Button size="full" onClick={() => navigate("/join/success")}>
            가입하기
          </Button>
        </div>
      </article>
    </main>
  );
}
